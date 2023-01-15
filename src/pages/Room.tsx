import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import logoImg from '../assets/logo.svg'
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { useAuth } from "../hooks/useAuth"

import toast, { Toaster } from 'react-hot-toast'
import { database } from "../services/firebase"

// Por padrão o useParams não sabe o que pode ser recebido na rota
type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avataR: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avataR: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
}


export function Room() {

    const { user } = useAuth()

    const params = useParams<RoomParams>()
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([]) // qnd é array precisamos tipar o que vem dentro dele
    const [title, setTitle] = useState('')

    async function handleSendQuestion(e: FormEvent) {
        e.preventDefault()

        if (newQuestion.trim() === '') {
            throw new Error(toast.error("Não foi possível enviar sua pergunta."))
        }

        if (!user) {
            throw new Error(toast.error("Não foi possível enviar sua pergunta."))
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }

        try {
            await database.ref(`rooms/${roomId}/questions`).push(question)
            toast.success("Pergunta realizada com sucesso!")
            setNewQuestion('')
        } catch {
            throw new Error(toast.error("Não foi possível enviar sua pergunta."))
        }
    }

    useEffect(() => {
        const roomRef = database.ref(`/rooms/${roomId}`)

        // .on serve para ficar escutando lá na api (Realtime)
        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId]) //passando roomID como critério para disparo da função useEffect para evitar bugs durante o uso da aplicação

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <header className="p-6 border-b-[1px] border-solid border-[#e2e2e2]">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <img
                        src={logoImg}
                        alt="LetMeAsk"
                        className="max-h-11"
                    />

                    <RoomCode code={roomId} />
                </div>
            </header>


            <main className="max-w-[800px] mx-auto">
                <div className="mt-8 mb-6 mx-0 flex items-center">
                    <h1 className="font-Poppins text-2xl text-black font-bold">
                        Sala <span className="text-purple-500">{title}</span>
                    </h1>

                    {questions.length > 0 && (
                        <span
                            className="ml-4 bg-pink-500 rounded-full py-2 px-4 text-white font-medium text-sm">
                            {questions.length} pergunta(s)
                        </span>
                    )}


                </div>


                <form onSubmit={handleSendQuestion}>
                    <textarea
                        className="w-full border-0 p-4 rounded-lg bg-details shadow-sm resize-y min-h-[130px]"
                        placeholder="O que você quer perguntar?"
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion} // este value é utilizado para zerar o valor após o envio
                    />

                    <div className="flex justify-between items-center mt-4">

                        {user ? (
                            <div className="flex items-center">
                                {/* <img
                                    className="w-8 h-8 rounded-full"
                                    src={}
                                    alt={user.name}
                                /> */}

                                <span className="ml-2 text-bold font-bold text-sm">
                                    {user.name.toUpperCase()}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-800 font-medium">
                                Para enviar uma pergunta,
                                <button className="ml-1 text-purple-500 underline text-sm font-medium cursor-pointer hover:text-purple-hover">
                                    faça seu login
                                </button>.
                            </span>
                        )}



                        <Button type="submit" disabled={!user}>
                            Enviar pergunta
                        </Button>


                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div >
    )
}