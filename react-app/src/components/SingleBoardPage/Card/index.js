import EditCardModal from '../EditCardModal';
import DeleteCardModal from '../DeleteCardModal';
import SingleCardModal from '../SingleCardModal';
import OpenModalButton from '../../OpenModalButton';

const Card = ({ card, listId }) => {

    return (

        <div className="card-color" style={{ backgroundColor: card.label_color }}>

            <div>
                <OpenModalButton
                    buttonText={card.title}
                    modalComponent={<SingleCardModal card={card} />}
                    className="card-title"></OpenModalButton>

                <div>
                    <OpenModalButton
                        buttonText={<i className="fas fa-pen card-icon" />}
                        modalComponent={<EditCardModal card={card} listId={listId} />}
                        className="card-icon"></OpenModalButton>

                    <OpenModalButton
                        buttonText={<i className="fas fa-trash card-icon" />}
                        modalComponent={<DeleteCardModal cardId={card.id} listId={listId} />}
                        className="card-icon"></OpenModalButton>
                </div>

            </div>

        </div>



    )
}

export default Card;
