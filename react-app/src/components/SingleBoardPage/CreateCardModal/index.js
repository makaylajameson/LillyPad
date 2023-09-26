import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createCardThunk } from "../../../store/card";
import { getSingleBoardThunk} from "../../../store/board"

import label1 from '../../../assets/label-1.jpg';
import label2 from '../../../assets/label-2.jpg';
import label3 from '../../../assets/label-3.jpg';
import label4 from '../../../assets/label-4.jpg';
import label5 from '../../../assets/label-5.jpg';


const labelColors = [
    label1,
    label2,
    label3,
    label4,
    label5,
]

const CreateCardModal = ({ listId, listTitle, boardId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState('')
    const [errors, setErrors] = useState({})
    const [description, setDescription] = useState('')
    const [labelColor, setLabelColor] = useState(labelColors[0])
    const [, setServerError] = useState(false);


    useEffect(() => {
        const serverError = {};

        if (!title.length) serverError["title"] = "👋 Card title is required"
        if (title.length > 80) serverError["title"] = "❗Title must be less than 80 characters"
        if (!description.length) serverError["description"] = "👋 Description is required"
        if (description.length > 300) serverError["description"] = "❗Description must be less than 300 characters"
        setErrors(serverError)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
          alert('Please fix the errors you have');
        } else {
            const formData = new FormData()

            formData.append('title', title)
            formData.append('list_id', listId)
            formData.append('description', description)
            formData.append('label_color', labelColor)

          try {
            await dispatch(createCardThunk(formData, listId));
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
                <label className='card-title-field'>
                    Card title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <span className='error-field'>{errors.title}</span>
                </label>
                <p>In list: {listTitle}</p>
                <label className='card-title-field'>
                    Label color
                    <ul className="cover-image-container">
                        {labelColors?.map(option => <div className="cover-image-option" key={option} style={{ backgroundColor: option }} onClick={() => setLabelColor(option)}></div>)}
                    </ul>
                </label>

                <label className='card-title-field'>
                    Description
                    <textarea onChange={(e) => setDescription(e.target.value)} style={errors.description && { boxShadow: 'rgb(239, 92, 72) 0px 0px 0px 2px inset' }} />
                    <span className='error-field'>{errors.description}</span>
                </label>
                <button type="submit" className='create-button'>Create</button>
            </form>
        </div>

    )
}

export default CreateCardModal
