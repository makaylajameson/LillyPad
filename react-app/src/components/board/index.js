import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBoardsThunk } from "../../store/boards"

import BoardCard from './BoardCard/index';
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../board/CreateBoardModal";

const CurrentBoardsPage = () => {

    const currentBoards = useSelector(state => state.boards.userBoards)
    const userBoardsArr = Object.values(currentBoards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserBoardsThunk())
    }, [dispatch])

    if (!currentBoards) return <h3>Loading...</h3>

    return (
        <>

                <h2 className="page-title">My Boards</h2>
                <ul>
                    <OpenModalButton
                        buttonText="Create new board"
                        modalComponent={<CreateBoardModal />}
                        className="new-board-button"
                    />
                    {userBoardsArr.map((board) => <BoardCard board={board} key={board.id} />)}
                </ul>

        </>
    )
}

export default CurrentBoardsPage
