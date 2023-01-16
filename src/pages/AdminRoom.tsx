// Hooks e Firebase
import { useNavigate, useParams } from "react-router-dom"
import { database } from "../services/firebase"

// Components
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"

// Assets e customizações
import { Toaster } from 'react-hot-toast'
import logoImg from '../assets/logo.svg'
import { Question } from "../components/Question"
import { useRoom } from "../hooks/useRoom"
import { BsTrash } from 'react-icons/bs'
import { AiOutlineCheckCircle } from 'react-icons/ai'

// Tipagem
// Por padrão o useParams não sabe o que pode ser recebido na rota
type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const navigate = useNavigate()

    const params = useParams<RoomParams>()
    const roomId = params.id;
    const { title, questions } = useRoom(roomId as string)


    function handleGoBack() {
        navigate(-1)
    }

    async function handleDeleteQuestion(questionId: string) {
        if (confirm('Tem certeza que você deseja encerrar esta sala?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        navigate('/')
    }

    return (
        <div>
            <Toaster position="top-right" reverseOrder={false} />
            <header className="p-6 border-b-[1px] border-solid border-[#e2e2e2]">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <img
                        src={logoImg}
                        alt="LetMeAsk"
                        className="max-h-11 cursor-pointer"
                        onClick={handleGoBack}
                    />

                    <div className="flex items-center gap-2">
                        <RoomCode code={roomId} />

                        <Button
                            className="h-10 border-dashed border-[1px] border-purple-hover bg-white text-purple-hover hover:bg-purple-500 hover:text-white hover:border-white"
                            onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>

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


                <div className="mt-8">
                    {
                        questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                >

                                    <button
                                        className="flex gap-4"
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}>
                                        <BsTrash
                                            className="text-danger-500 hover:brightness-75 transition-all"
                                            size={24}
                                        />

                                        <AiOutlineCheckCircle
                                            className="text-black hover:brightness-75 transition-all"
                                            size={24}
                                        />
                                    </button>
                                </Question>
                            )
                        })
                    }
                </div>
            </main>
        </div >
    )
}