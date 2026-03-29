import { evaluateGuess } from "../utils"
import Tile from "./Tile"
export default function Row({isSubmitted , guess , answer}){

    return (<div className="row">
        {
          Array.from({length:5}).map(( _ , i) => {

              
            const Obj =  isSubmitted ? evaluateGuess(guess , answer)[i]:{letter:guess[i] || '' , status:''}
              
            return <Tile key={i} letter={Obj.letter} status ={Obj.status}/>
          })
        }
    </div>)
}