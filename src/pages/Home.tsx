// Components
import { Button } from '../components/Button'

// Hooks de navegação
import { useNavigate } from 'react-router-dom'

// SVGs
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

export function Home() {
    const navigate = useNavigate()

    function navigateToNewRoom() {
        navigate('/rooms/new')
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
                        className='mt-16 h-12 rounded-lg font-medium bg-google flex justify-center items-center cursor-pointer border-0 text-[#fff] hover:brightness-90 transition-all'
                        onClick={navigateToNewRoom}
                    >
                        <img
                            src={googleIconImg}
                            alt="logo do google"
                            className='mr-8'
                        />
                        Crie sua sala com o google
                    </button>


                    <div
                        className='text-sm text-gray-500 my-8 flex items-center before:flex-1 before:h-[1px] before:bg-gray-500 before:mr-4 after:flex-1 after:h-[1px] after:bg-gray-500 after:ml-4'>
                        Ou entre em uma sala
                    </div>

                    <form className='flex flex-col'>
                        <input
                            className='h-12 rounded-lg px-4 bg-[#fff] border-[1px] border-solid border-gray-500'
                            type="text"
                            placeholder='Digite o código da sala'
                        />

                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                        {/* <button type='submit' className='mt-4'>
                           
                        </button> */}
                    </form>
                </div>
            </main>
        </div>
    )
}