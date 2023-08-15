import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createBoardThunk } from '../../store/board';
import Background from './background.svg';
import './Board.css';

import background1 from '../../assets/background-1.jpg';
import background2 from '../../assets/background-2.jpg';
import background3 from '../../assets/background-3.jpg';
import background4 from '../../assets/background-4.jpg';
import background5 from '../../assets/background-5.jpg';
import background6 from '../../assets/background-6.jpg';
import background7 from '../../assets/background-7.jpg';
import background8 from '../../assets/background-8.jpg';

const background_pics = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
];


const CreateBoardModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [backgroundUrl, setBackgroundUrl] = useState(background_pics[0]);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});


    useEffect(() => {

        const errors = {};

        if (!title.length) errors["title"] = "Title is required";
        if (title.length > 100) errors["title"] = "Title must be less than 100 characters";

        setErrors(errors);
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('background_image', backgroundUrl);


        const data = await dispatch(createBoardThunk(formData));

        if ('errors' in data) setErrors(data.errors);
        else closeModal();
    }

    return (
        <div>
            <p className="create-board-title">Create board</p>

            <div className="background-board-img" style={{ backgroundImage: `url(${backgroundUrl})` }}>
                <img src={Background} alt="" className="mock-background" />
            </div>

            <p className='select-background'>Select Your Background:</p>
            <div className="background-container">
                {background_pics.map((url) => {
                    return <button onClick={() => setBackgroundUrl(url)} className="background_images" style={{ backgroundImage: `url(${url})`, 'objectFit': 'contain' }}></button>
                })}
            </div>

            <div className='board-title-submit'>
                <form onSubmit={handleSubmit} >
                    <div className='board-input-row'>
                        <label className='board-title'>
                            Board title:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <span className='error-field'>{errors.title}</span>
                        </label>
                    </div>
                    <div className='button-row'>
                        <button disabled={Object.keys(errors).length > 0} type="submit" className='create-button'>Create</button>
                    </div>
                </form>
            </div>


        </div>

    )
}

export default CreateBoardModal
