export default function Tile({letter , status}){

    return <div className={`tile ${status} text-3xl font-bold tracking-widest text-center`}> {letter} </div>
}