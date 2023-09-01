import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSingleBoardThunk } from '../../store/board'
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "./CreateListModal";
import List from './List'
import './BoardModal.css';
import Footer from "../footer";

const SingleBoardPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const singleDetail = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(id))
    }, [dispatch, id])

    if (!singleDetail) return <div> Loading..</div>

    return (
        <div>

            <h2 className="single-board-title">{singleDetail.title}</h2>

            <div className="page" style={{ backgroundImage: `url(${singleDetail?.background_image})` }}>

                <ul className="lists-container" >
                    <div className="single-list-detail">
                        {singleDetail.lists?.map((list) => <List key={list.id} list={list} />)}

                        <div className="add-list" >
                            <OpenModalButton
                                buttonText={<><i className="fas fa-plus" /> Add a list</>}
                                modalComponent={<CreateListModal boardId={id} />}
                            />
                        </div>
                    </div>
                </ul>
            </div>
            < Footer />
        </div>
    )
}

export default SingleBoardPage
