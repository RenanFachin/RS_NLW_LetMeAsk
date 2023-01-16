// Components
import { Button } from '../components/Button'

// Hooks de navegação
import { useNavigate } from 'react-router-dom'

// SVGs
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import { BsGoogle } from 'react-icons/bs'

// Contexts e Hooks
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { Input } from '../components/Input'

export function Home() {
    const navigate = useNavigate()
    const { user, signInWithGoogle } = useAuth()

    const [roomCode, setRoomCode] = useState('')

    // Criando uma sala nova após realizar autenticação
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        navigate('/rooms/new')
    }

    // Entrando em uma sala existente
    async function handleJoinRoom(e: FormEvent) {
        e.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        // Verificando se a sala existe no db
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            alert('Room does not exists')
            return
        }

        navigate(`/rooms/${roomCode}`)
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

                    <button
                        className='mt-16 h-12 rounded-lg font-medium bg-google flex justify-center items-center cursor-pointer border-0 text-[#fff] hover:brightness-110 transition-all hover:bg-details hover:text-purple-hover'
                        onClick={handleCreateRoom}
                    >
                        <BsGoogle 
                            size={24} 
                            className="mr-2" 
                        />

                        Crie sua sala com o google
                    </button>


                    <div
                        className='text-sm text-gray-500 my-8 flex items-center before:flex-1 before:h-[1px] before:bg-gray-500 before:mr-4 after:flex-1 after:h-[1px] after:bg-gray-500 after:ml-4'>
                        Ou entre em uma sala
                    </div>

                    <form className='flex flex-col' onSubmit={handleJoinRoom}>

                        <Input 
                            placeholder='Digite o código da sala'
                            onChange={e => setRoomCode(e.target.value)}
                            value={roomCode}
                        />

                        <Button type='submit' className='h-12'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}