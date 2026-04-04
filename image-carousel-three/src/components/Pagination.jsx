export default function Pagination({data , currentImageIndex, changeImageIndex}){

    return <div className="pagination-wrapper">
        {
         data.map((ele , index) => <div className={`pagination-dot ${index === currentImageIndex ? 'active' : ''}`} onClick={() => changeImageIndex(index)}></div>)
        }
    </div>
}