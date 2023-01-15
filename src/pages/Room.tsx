import { useParams } from "react-router-dom"
import logoImg from '../assets/logo.svg'
import { Button } from "../components/Button"

export function Room() {
    const {id} = useParams()


    return(
        <div>
            <header className="p-6 border-b-[1px] border-solid border-[#e2e2e2]">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <img 
                        src={logoImg} 
                        alt="LetMeAsk" 
                        className="max-h-11"
                    />

                    <div className="">
                        Código
                    </div>
                </div>
            </header>


            <main className="max-w-[800px] mx-auto">
                <div className="mt-8 mb-6 mx-0 flex items-center">
                    <h1 className="font-Poppins text-base text-black">
                        Sala React
                    </h1>

                    <span 
                    className="ml-4 bg-pink-500 rounded-full py-2 px-4 text-white font-medium text-sm">
                        4 perguntas
                    </span>
                </div>


                <form>
                    <textarea 
                        className="w-full border-0 p-4 rounded-lg bg-details shadow-sm resize-y min-h-[130px]"
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-800 font-medium">
                            Para enviar uma pergunta,
                            <button className="ml-1 text-purple-500 underline text-sm font-medium cursor-pointer hover:text-purple-hover">
                                faça seu login
                            </button>.
                        </span>

                        <Button type="submit">
                            Enviar pergunta
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}