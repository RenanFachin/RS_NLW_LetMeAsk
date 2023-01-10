import { useState } from "react"

export function Button() {
    const [counter, setCounter] = useState<number>(0)

    function increment() {
        setCounter(counter + 1)
        console.log(counter)
    }

    return (
        <button className="bg-violet-600 text-white rounded-lg p-5" onClick={increment}>
            {counter}
        </button>
    )
}