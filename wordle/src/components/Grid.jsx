
import Row from "./Row"
export default function Grid({guesses , currentWord , word}){

    return(<div>
        { Array.from({length:6}).map( ( _ ,i) => {
            const isSubmitted = i < guesses.length;
            const isActive = i === guesses.length
            const guess = isSubmitted ? guesses[i] : isActive ? currentWord : ' ';
 

            
            return <Row key={i} isSubmitted={isSubmitted} guess = {guess} answer = {word}/>
        })
        }
    </div>)

}

