import { useModal } from '../../../context/Modal';
import { deleteCardThunk } from '../../../store/card';
import { useDispatch, useSelector } from "react-redux";
import { getSingleBoardThunk } from "../../../store/board"

const DeleteCardModal = ({ cardId, listId }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const singleDetail = useSelector(state => state.boards.singleBoard)


    const handleConfirm = async () => {
        await dispatch(deleteCardThunk(cardId, listId))
        await dispatch(getSingleBoardThunk(singleDetail.id));
        await closeModal()

    }

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-inner-container">
                <p className='confirm-delete'>Are you sure you want to delete this card?</p>
                <div className="delete-button-container">
                    <button onClick={closeModal} className="cancel-delete-button">Cancel</button>
                    <button onClick={() => handleConfirm()} className="delete-button"> Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCardModal;
