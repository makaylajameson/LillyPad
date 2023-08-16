import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBoardsThunk } from "../../store/board"

import BoardCard from './BoardCard/index';
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../board/CreateBoardModal";

const CurrentBoardsPage = () => {

    const currentBoards = useSelector(state => state.boards.userBoards)
    const userBoardsArr = Object.values(currentBoards)
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log('THIS IS THE USER', user)

    useEffect(() => {
        dispatch(getUserBoardsThunk())
    }, [dispatch])

    if (!currentBoards) return <h3>Loading...</h3>

    return (
        <div>
            <div className="board-page-title-container">


                <h2 className="board-page-title">
                    <div className="user-img-name">
                        <img className="profile-pic-board" src={user?.profile_pic} />
                        <div>{user?.first_name} {user?.last_name}'s workspace</div>
                    </div>
                    <div className="your-boards-title">
                        <i className="far fa-user"></i> Your Boards
                    </div>
                </h2>
            </div>

            <div>
                <div className="board-card-container">
                    {userBoardsArr.map((board) => <BoardCard board={board} key={board.id} />)}
                    <div className="create-new-board-button">
                        <OpenModalButton
                            buttonText="Create new board"
                            modalComponent={<CreateBoardModal />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentBoardsPage
