import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editCardThunk } from "../../../store/card";
import { getSingleBoardThunk } from '../../../store/board';

const labelColors = [
    '#4287f5',
    '#f5f542',
    '#42f54b',
    '#cb42f5',
    '#4245f5',
    '#f54242',
]

const EditCardModal = ({ card, listId, cardId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState(card.title)
    const [errors, setErrors] = useState({})
    const [, setServerError] = useState(false);
    const [description, setDescription] = useState(card.description)
    const [labelColor, setLabelColor] = useState(card.label_color)
    const boardId = useSelector(state => state.boards.singleBoard.id)

    useEffect(() => {
        const serverError = {};

        if (title.length > 80) serverError["title"] = "❗Title must be less than 80 characters"
        if (!title.length) serverError["title"] = "👋 Card title is required"
        if (!description.length) serverError["description"] = "👋 Description is required"
        if (description.length > 300) serverError["description"] = "❗Description must be less than 300 characters"
        setErrors(serverError)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
          alert('Please fix the errors');
        } else {
            const formData = new FormData()

            formData.append('title', title)
            formData.append('list_id', listId)
            formData.append('description', description)
            formData.append('label', labelColor)
            formData.append('board_id', boardId)

          try {
            await dispatch(editCardThunk(card.id, formData))
          } catch (error) {
            setServerError(error.message);
          }
          await dispatch(getSingleBoardThunk(boardId));
          await closeModal();
        }
      };

    return (
        <div className="create-card-background">
            <div className="cover-img-preview" style={{ backgroundColor: labelColor }}></div>
            <form onSubmit={handleSubmit} className='card-form'>
                <p className='card-title-field'>Edit Card Details:</p>
                <label className='card-field'>
                    Card title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={errors.title && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <p>In list: {card.list_title}</p>
                <label className='card-title-field'>
                Select Your Label Color:
                <ul className="cover-image-container">
                    {labelColors.map(option => (
                        <div
                            className={`cover-image-option ${option === labelColor ? 'selected' : ''}`}
                            key={option}
                            style={{ backgroundColor: option }}
                            onClick={() => setLabelColor(option)}
                        ></div>
                    ))}
                </ul>
            </label>

            {/* Selected color indicator */}
            <div className="selected-color-indicator-container">
                <p>Selected Color:</p>
                <div
                    className="selected-color-indicator"
                    style={{ backgroundColor: labelColor }}
                ></div>
            </div>

                <label className='card-field'>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={errors.description && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }}
                    />
                    <span className='error-field'>{errors.description}</span>
                </label>
                <button type="submit" className='create-card-button'>Update</button>
            </form>
        </div>
    )
}


export default EditCardModal
