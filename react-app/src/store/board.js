import { normalizeObj } from './normalizeHelper';

// Action
const GET_USER_BOARDS = 'boards/GET_USER_BOARDS';
const GET_SINGLE_BOARD = 'boards/GET_SINGLE_BOARD';
const CREATE_NEW_BOARD = 'boards/CREATE_NEW_BOARD';
const EDIT_BOARD = 'boards/EDIT_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

// Action Creator
const getUserBoards = (boards) => ({
    type: GET_USER_BOARDS,
    boards
});

const getSingleBoard = (board) => ({
    type: GET_SINGLE_BOARD,
    board
});

const createNewBoard = (board) => ({
    type: CREATE_NEW_BOARD,
    board
});

const editBoard = (board, id) => ({
    type: EDIT_BOARD,
    board,
    id
});

const deleteBoard = (id) => ({
    type: DELETE_BOARD,
    id
});

// Thunks
export const getUserBoardsThunk = () => async (dispatch) => {
    const response = await fetch('/api/boards/current')
    if (response.ok) {
        const { boards } = await response.json()
        dispatch(getUserBoards(boards))
        return
    } else {
        const errors = await response.json()
        return errors
    }
};

export const getSingleBoardThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/boards/${id}`)

    if (response.ok) {
        const get_single_board = await response.json()
        dispatch(getSingleBoard(get_single_board))
        return
    } else {
        const errors = await response.json()
        return errors
    }
};

export const createBoardThunk = (FormData) => async (dispatch) => {
    const response = await fetch('/api/boards/current', {
        method: "POST",
        body: FormData
    })
    if (response.ok) {
        const { board } = await response.json()
        dispatch(createNewBoard(board))
        return board;
    } else {
        const data = await response.json()
        return data
    }
};

export const editBoardThunk = (id, formData) => async (dispatch) => {
    const response = await fetch(`/api/boards/${id}/edit`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const { board } = await response.json()
        dispatch(editBoard(board, id))
        return board;
    } else {
        const data = await response.json()
        return data
    }
};

export const deleteBoardThunk = (id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBoard(id))
        return data
    } else {
        const data = await response.json()
        return data
    }
};


// Initial State
const initialState = {
    userBoards: {},
    singleBoard: {}
};

// Reducer
const boardReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_BOARDS:
            return { ...state, userBoards: { ...normalizeObj(action.boards) } }

        case GET_SINGLE_BOARD:
            return { ...state, singleBoard: { ...action.board.single_board } }

        case CREATE_NEW_BOARD:
            return { ...state, userBoards: { ...state.userBoards, [action.board.id]: action.board } }

        case EDIT_BOARD:
            return { ...state, userBoards: { ...state.userBoards, [action.id]: action.board } }

        case DELETE_BOARD:
            const newState = Object.assign({}, state)
            delete newState.userBoards[action.id]
            return { ...state, userBoards: { ...newState.userBoards } }

        default:
            return state
    }
}

export default boardReducer
