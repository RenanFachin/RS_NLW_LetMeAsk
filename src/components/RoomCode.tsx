import copyImg from '../assets/copy.svg'

type RoomCodeProps = {
    code: string;
}

export function RoomCode({ code }: RoomCodeProps) {

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(code)
    }


    return (
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
    )
}