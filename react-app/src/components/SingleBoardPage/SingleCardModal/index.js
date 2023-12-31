import './SingleCardModal.css';


const SingleCardModal = ({ card }) => {

    return (
        <div className="single-card-background">
            <div className='single-card-container'>
                <h1 className="single-card-title">{card.title}</h1>
                <p className='single-card-list-title'>In List: {card.list_title}</p>
                <p className='single-card-description-header'>Description: </p>
                <p className='single-card-description'>{card.description}</p>
            </div>
        </div>
    )
}

export default SingleCardModal
