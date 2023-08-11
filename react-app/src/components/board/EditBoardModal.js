import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { editBoardThunk } from "../../store/boards";
import Background from '../board/background.svg'

const background_urls = [
    "https://i.pinimg.com/564x/20/0e/e4/200ee4aa6b62a91040f7d7c0123e1ee2.jpg",
    "https://i.pinimg.com/564x/73/51/17/735117e0d39ddc6d85ccbc2b5c3b0fc1.jpg",
    "https://i.pinimg.com/564x/8d/73/04/8d730490141a27fa366fbd3750bbfe94.jpg",
    "https://i.pinimg.com/564x/b2/89/ba/b289ba951f1bc9522c8bfa318cbd7659.jpg",
    "https://i.pinimg.com/564x/7c/bc/1e/7cbc1ea9e2a55e6c6607fa086d3a95c6.jpg",
    "https://i.pinimg.com/564x/aa/cc/73/aacc7396ae301a02cb4023b47090ad5d.jpg",
    "https://i.pinimg.com/736x/c0/6a/15/c06a15cff45dbc009d08029a7a4ed05a.jpg",
    "https://i.pinimg.com/564x/c3/65/0f/c3650f46bf6501928cb5fc8814902b89.jpg"
]


const EditBoardModal = ({ boardId }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const boardToEdit = useSelector(state => state.boards.userBoards[boardId])

    const [backgroundUrl, setBackgroundUrl] = useState(boardToEdit.background_image)
    const [title, setTitle] = useState(boardToEdit.title)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        const errors = {}

        if (!title.length) errors["title"] = "Title is required"
        if (title.length > 100) errors["title"] = "Title must be less than 100 characters"
        setErrors(errors)
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).length) return

        const formData = new FormData()
        formData.append('title', title)
        formData.append('background_image', backgroundUrl)

        const data = await dispatch(editBoardThunk(boardId, formData))

        if ('errors' in data) {
            setErrors(data.errors)
        } else {
            history.push('/boards/current')
            closeModal()
        }
    }

    return (
        <div className="create-board-container">
                <p className="create-board-title">Edit board below:</p>


                    <div style={{ backgroundImage: `url(${backgroundUrl})` }}>
                        <img src={Background} alt=""/>
                    </div>

                <p>Background</p>
                <div className="background-container">
                    {background_urls.map((url) => {
                        return <button onClick={() => setBackgroundUrl(url)} className="background_images" style={{ 'background-image': `url(${url})`, 'objectFit': 'contain' }}></button>
                    })}
                </div>

                <form onSubmit={handleSubmit} className='board-form'>
                    <label className='board-title'>
                        Board title
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <span className='error-field'>{errors.title}</span>
                    </label>
                    <button type="submit" className='create-button'>Update Board</button>
                </form>
            </div>
    )
}

export default EditBoardModal
