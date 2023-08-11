import { Link } from 'react-router-dom'
import EditBoardModal from '../EditBoardModal'
import OpenModalButton from '../../OpenModalButton'
import DeleteBoardModal from '../DeleteBoardModal'

const BoardCard = ({ board }) => {
    return (
        <div style={{ backgroundImage: `url(${board.background_image})` }}>
            <Link to={`/boards/${board.id}`}><h4>{board.title}</h4></Link>
            <ul>
                <OpenModalButton
                    buttonText={<i className="fas fa-pen board-icon" />}
                    modalComponent={<EditBoardModal boardId={board.id} />}
                    className="modal-button"
                />
                <OpenModalButton
                    buttonText={<i className="fas fa-trash board-icon" />}
                    modalComponent={<DeleteBoardModal boardId={board.id} />}
                    className="modal-button"
                />
            </ul>
        </div>
    )
}

export default BoardCard
