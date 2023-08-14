import OpenModalButton from '../../OpenModalButton'
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';

const List = ({ list, boardId }) => {

    return (
        <li className="list-container">

            <div className='list-header-container'>
                <h4>{list.title}</h4>

                <OpenModalButton
                    buttonText={<i className="list-icon fas fa-pen" />}
                    modalComponent={<EditListModal list={list} />}
                    className="modal-button"
                />

                <OpenModalButton
                    buttonText={<i className="list-icon fas fa-trash" />}
                    modalComponent={<DeleteListModal list={list} />}
                    className="modal-button"
                />

            </div>
        </li>
    )
}

export default List
