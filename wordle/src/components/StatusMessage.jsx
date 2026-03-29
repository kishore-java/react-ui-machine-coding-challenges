import { Message } from "../utils";

export default function StatusMessage({ message }) {
    if (message === 'playing') return null;

    return (
        <div className="text-center mt-4 text-lg font-bold">
            <p>{Message[message]}</p>
            {message === 'lost' && (
                <p>The word was <span className="text-green-600">{Message[message]}</span></p>
            )}
        </div>
    )
}