import { getKeyStatus } from "../utils";

const KEYBOARD_LAYOUT = Object.freeze([
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]);

export default function Keyboard({ onKey, guesses, answer }) {
    const status = getKeyStatus(guesses , answer);
    return (
        <div className="keyboard flex flex-col items-center gap-2">
            {KEYBOARD_LAYOUT.map((row, i) => (
                <div key={i} className="flex gap-1">
                    {row.map((key) => (
                        <button
                            key={key} 
                            onClick={() => onKey(key)}
                            className={`${status[key] || 'default'} px-2 py-3 text-xs sm:px-3 sm:py-4 sm:text-sm`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}