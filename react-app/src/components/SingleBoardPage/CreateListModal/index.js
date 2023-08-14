import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createListThunk } from "../../../store/list";
import { getSingleBoardThunk} from "../../../store/board"

const CreateListModal = ({ boardId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(false);

    useEffect(() => {
        let serverError = {};

        if (!title.length) serverError["title"] = "List title is required"
        if (title.length > 100) serverError["title"] = "Title must be less than 100 characters"
        setErrors(serverError)
    }, [title])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
          alert('Please fix the errors you have');
        } else {
            const formData = new FormData()

                formData.append('title', title)
                formData.append('board_id', boardId)

          try {
            await dispatch(createListThunk(formData));
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
                    Enter list title
                    <input
                        className="list-input-text"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <button type="submit" className='create-button'>Add List</button>
            </form>
        </div>
    )
}

export default CreateListModal
