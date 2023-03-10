// Navegação
import { Link, useNavigate } from 'react-router-dom'

// Components
import { Button } from '../components/Button'

// SVGs
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { Input } from '../components/Input'

// Contextos
// import { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'

export function NewRoom() {

    const navigate = useNavigate()
    const { user } = useAuth()

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(e: FormEvent) {
        e.preventDefault()

        // Validando se o nome digitado é válido
        if (newRoom.trim() === '') {
            return
        }

        // Firebase
        const roomRef = database.ref('rooms') // Procurando uma referência "rooms" no db

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        }) // Fazendo o envio das infos

        // Redirecionamento para sala criada - o key é o id gerado na criação da sala
        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div className='h-screen flex items-stretch'>
            <aside className='flex-5 bg-purple-500 text-[#fff] flex flex-col py-32 px-20'>
                <img
                    src={illustrationImg}
                    alt="Ilustração simbolizando perguntas e respostas"
                    className='max-w-xs'
                />

                <strong className='font-bold font-Poppins text-4xl leading-10 mt-4'>
                    Crie salas de Q&A ao-vivo
                </strong>

                <p className='text-2xl mt-4 text-white'>
                    Tire as dúvidas da sua audiência em tempo real
                </p>


            </aside>

            <main className='flex-8 px-8 flex items-center justify-center'>
                <div className='flex flex-col items-stretch text-center w-full max-w-xs'>
                    <img
                        src={logoImg}
                        alt="LetMeAsk logo"
                        className='self-center'
                    />

                    <h2 className='text-2xl font-bold font-Poppins mt-14'>
                        Criar uma nova sala
                    </h2>

                    <form className='flex flex-col mt-6' onSubmit={handleCreateRoom}>

                        <Input
                            placeholder='Digite o código da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type='submit' className='h-12'>
                            Criar sala
                        </Button>
                    </form>

                    <p className='text-sm text-gray-800 mt-4'>
                        Quer entrar em uma sala existente?

                        <Link to='/' className='text-pink-500 ml-1'>
                            Clique aqui
                        </Link>
                    </p>
                </div>
            </main >
        </div >
    )
}