import copyImg from '../assets/copy.svg'
import toast, { Toaster } from 'react-hot-toast'

type RoomCodeProps = {
    code: string | undefined;
}

export function RoomCode({ code }: RoomCodeProps) {


    function copyRoomCodeToClipBoard() {
        try{
            if (code) {
                navigator.clipboard.writeText(code)
                toast.success("O código da sala foi copiado!")
            }
        } catch {
            throw new Error(toast.error("Ops! Algo de errado aconteceu e não foi possível copiar o código da sala."))
        }

    }


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <button
                onClick={copyRoomCodeToClipBoard}
                className="h-10 rounded-lg overflow-hidden bg-white border-[1px] border-solid border-purple-500 cursor-pointer flex">
                <div className='bg-purple-500 px-3 flex items-center justify-center h-10'>
                    <img
                        src={copyImg}
                        alt="Copy room code"
                    />
                </div>

                <span className='block self-center flex-1 pr-4 pl-3 w-60 text-sm font-medium'>
                    Sala #{code}
                </span>
            </button>
        </>
    )
}