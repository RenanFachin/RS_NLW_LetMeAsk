import { ReactNode } from "react";
import { CiUser } from "react-icons/ci";

interface QuestionProps {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
}

export function Question({ content, author, children }: QuestionProps) {

    return (
        <div className="bg-details rounded-lg shadow p-6 mt-4">
            <p className="text-black">
                {content}
            </p>

            <footer className="flex justify-between items-center mt-6">
                <div className="flex items-center">
                    <CiUser
                        className="w-9 h-9 p-2 rounded-full bg-purple-500 text-white"
                        size={18}
                    />

                    <span className="ml-2 text-bold font-bold text-sm text-gray-800">
                        {author.name.toUpperCase()}
                    </span>
                </div>


                <div className="">
                    {children}
                </div>
            </footer>
        </div>
    )
}