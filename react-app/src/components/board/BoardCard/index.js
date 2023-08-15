import { Link } from 'react-router-dom'
import EditBoardModal from '../EditBoardModal'
import OpenModalButton from '../../OpenModalButton'
import DeleteBoardModal from '../DeleteBoardModal'

const BoardCard = ({ board }) => {
    return (
        <div className="board-card-img" style={{ backgroundImage: `url(${board.background_image})` }}>
            <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none' }}>
                <h4 className='board-card-name'>{board.title}</h4>
            </Link>
            <div className='board-card-buttons'>

                <div className='modal-button-board-card'>
                    <OpenModalButton
                        buttonText={<i className="fas fa-pen board-icon" />}
                        modalComponent={<EditBoardModal boardId={board.id} />}
                    />
                </div>

                <div className='modal-button-board-card'>
                    <OpenModalButton
                        buttonText={<i className="fa-solid fa-x" />}
                        modalComponent={<DeleteBoardModal boardId={board.id} />}
                    />
                </div>

            </div>
        </div>
    );
};


export default BoardCard
