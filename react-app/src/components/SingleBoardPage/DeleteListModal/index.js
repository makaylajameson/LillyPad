import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteListThunk } from "../../../store/list";
import { getSingleBoardThunk} from "../../../store/board"
import '../BoardModal.css';


const DeleteListModal = ({ list }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const listToDelete = useSelector(state => state.boards.singleBoard.lists.find(e => e.id === list.id))
    const singleDetail = useSelector(state => state.boards.singleBoard)

    const deleteList = async () => {
        await dispatch(deleteListThunk(listToDelete.id))
        await dispatch(getSingleBoardThunk(singleDetail.id));
        await closeModal()
    }

    return (
        <div className="delete-modal-container">
            <div className="delete-modal-inner-container">
                <p className='confirm-delete'>Are you sure you want to delete this list?</p>
                <div className="delete-button-container">
                    <button onClick={closeModal} className="cancel-delete-button">Cancel</button>
                    <button className="delete-button" onClick={deleteList}>Delete</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteListModal
