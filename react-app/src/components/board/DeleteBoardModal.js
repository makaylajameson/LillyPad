import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBoardThunk } from "../../store/board";


const DeleteBoardModal = ({ boardId }) => {

    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const deleteProject = (e) => {
        dispatch(deleteBoardThunk(boardId))
        closeModal()
    }

    return (
        <div className="delete-modal-container">

                <p className='confirm-delete'>Confirm you would like to delete this board:</p>

                <div className="delete-button-container">
                    <button onClick={closeModal} className="cancel-delete-button">Cancel</button>
                    <button className="delete-button" onClick={deleteProject}>Delete</button>
                </div>

        </div>
    )
}

export default DeleteBoardModal
