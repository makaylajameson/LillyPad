import OpenModalButton from '../../OpenModalButton';
import DeleteListModal from '../DeleteListModal';
import EditListModal from '../EditListModal';
import CreateCardModal from '../CreateCardModal';
import '../BoardModal.css'
import Card from '../Card';
import { getSingleBoardThunk } from '../../../store/board';
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

const List = ({ list }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleBoardThunk(id))
    }, [dispatch, id])

    return (
        <>
            <div className="list-container">

                <div className='list-header-container'>
                    <h4 className='single-list-title'>{list.title}</h4>

                    <div className='modal-button-board-card'>
                        <OpenModalButton
                            buttonText={<i className="list-icon fas fa-pen" />}
                            modalComponent={<EditListModal list={list} />}
                            className="modal-button" />
                    </div>

                    <div className='modal-button-board-card'>
                        <OpenModalButton
                            buttonText={<i className="list-icon fas fa-trash" />}
                            modalComponent={<DeleteListModal list={list} />}
                            className="modal-button"
                        />
                    </div>

                    {/* <div className='create-card-container'>

                        <div>
                            {list.cards?.map((card) => <Card key={card.id} card={card} listId={list.id} />)}
                        </div>

                        <div className="add-card" >
                            <OpenModalButton
                                buttonText={<><i className="fas fa-plus" /> Add a card</>}
                                modalComponent={<CreateCardModal listId={list.id} listTitle={list.title} boardId={id} />}
                            />
                        </div>
                    </div> */}

                </div>

                <div className='create-card-container'>

                        <div>
                            {list.cards?.map((card) => <Card key={card.id} card={card} listId={list.id} />)}
                        </div>

                        <div className="add-card" >
                            <OpenModalButton
                                buttonText={<><i className="fas fa-plus" /> Add a card</>}
                                modalComponent={<CreateCardModal listId={list.id} listTitle={list.title} boardId={id} />}
                            />
                        </div>
                    </div>

            </div>

        </>
    )
}

export default List
