import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editListThunk } from '../../../store/list';
import { getSingleBoardThunk } from '../../../store/board';
import '../BoardModal.css';

const EditListModal = ({ list }) => {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const listToEdit = useSelector(state => state.boards.singleBoard.lists.find(e => e.id === list.id))
    const boardId = useSelector(state => state.boards.singleBoard.id)
    const [title, setTitle] = useState(listToEdit.title)
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        let serverError = {}

        if (!title.length) serverError["title"] = "👋 List title is required"
        if (title.length > 30) serverError["title"] = "👋 Title must be less than 30 characters"
        setErrors(serverError)
    }, [title])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
          alert('Please fix the errors');
        } else {
            const formData = new FormData()

                formData.append('title', title)
                formData.append('board_id', boardId)

          try {
            await dispatch(editListThunk(list.id, formData))
          } catch (error) {
            setServerError(error.message);
          }
          await dispatch(getSingleBoardThunk(boardId));
          await closeModal();
        }
      };

    return (
        <div className="create-list-inner-container">
            <form onSubmit={handleSubmit} className='list-form'>
                <label className='list-title-field'>
                    Update list title...
                    <input
                        className="list-input-text"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <button type="submit" className='create-button'>Update</button>
            </form>
        </div>
    )
}

export default EditListModal
