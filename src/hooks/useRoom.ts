import { useEffect, useState } from "react"
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: string;
    isHighlighted: string;
    likes: Record<string, {
        authorId: string;
    }>
}>


export function useRoom(roomId: string) {
    const { user } = useAuth()

    // qnd é array precisamos tipar o que vem dentro dele
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

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
                    isHighlighted: value.isHighlighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
                }
            })
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })


        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id]) //passando roomID como critério para disparo da função useEffect para evitar bugs durante o uso da aplicação


    return { questions, title }
}