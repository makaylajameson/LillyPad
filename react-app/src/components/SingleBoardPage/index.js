import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSingleBoardThunk } from '../../store/board'
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "./CreateListModal";
import List from './List'

const SingleBoardPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const singleDetail = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getSingleBoardThunk(id))
    }, [dispatch, id])

    if (!singleDetail) return <div> Loading..</div>

    return (
        <div className="page" >
            <div className="board-title">
                <h2>{singleDetail.title}</h2>
            </div>
            <ul className="lists-container" >

                {singleDetail.lists?.map((list) => <List key={list.id} list={list} />)}

                <OpenModalButton
                    buttonText={<><i className="fas fa-plus" /> Add a list</>}
                    modalComponent={<CreateListModal boardId={id} />}
                    className="add-list"
                />
            </ul>
        </div>
    )
}

export default SingleBoardPage
