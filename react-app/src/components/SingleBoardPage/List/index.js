import OpenModalButton from '../../OpenModalButton'
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';
import '../BoardModal.css'

const List = ({ list, boardId }) => {

    return (
        <div className="list-container">

            <div className='list-header-container'>
                <h4 className='single-list-title'>{list.title}</h4>

                <div className='modal-button-board-card'>
                    <OpenModalButton
                        buttonText={<i className="list-icon fas fa-pen" />}
                        modalComponent={<EditListModal list={list} />}
                        className="modal-button"
                    />
                </div>

                <div className='modal-button-board-card'>
                    <OpenModalButton
                        buttonText={<i className="list-icon fas fa-trash" />}
                        modalComponent={<DeleteListModal list={list} />}
                        className="modal-button"
                    />
                </div>

            </div>
        </div>
    )
}

export default List
