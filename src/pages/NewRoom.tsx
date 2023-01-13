// Navegação
import { Link } from 'react-router-dom'

// Components
import { Button } from '../components/Button'

// SVGs
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'

// Contextos
// import { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'

export function NewRoom() {
    // const { user } = useContext(AuthContext)
    const { user } = useAuth()

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

                <form className='flex flex-col mt-6'>
                    <input
                        className='h-12 rounded-lg px-4 bg-[#fff] border-[1px] border-solid border-gray-500'
                        type="text"
                        placeholder='Digite o código da sala'
                    />

                    <Button type='submit'>
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