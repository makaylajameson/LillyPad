// Action
const CREATE_LIST = 'lists/CREATE_LIST';
const EDIT_LIST = 'lists/EDIT_LIST';
const DELETE_LIST = 'lists/DELETE_LIST';


// Action Creator
const createList = (list) => ({
    type: CREATE_LIST,
    list
});

const editList = (list) => ({
    type: EDIT_LIST,
    list
});

const deleteList = (id) => ({
    type: DELETE_LIST,
    id
});


// Thunks

export const createListThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/lists/new-list', {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        const list = await response.json()
        dispatch(createList(list))
        return list;
    } else {
        const data = await response.json()
        return data
    }
}

export const editListThunk = (id, formData) => async (dispatch) => {
    const response = await fetch(`/api/lists/${id}`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const list = await response.json()
        await dispatch(editList(list))
        return list;
    } else {
        const data = await response.json()
        return data
    }
}

export const deleteListThunk = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},

    })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteList(listId))
        return data
    } else {
        const data = await response.json()
        return data
    }
}

const initialState = {
    boardLists: {},
};

// Reducer
const listReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_LIST:
            return {...state, boardLists: {...state.boardLists, [action.list.id]: action.list} }

        case EDIT_LIST:
            newState = {...state, boardLists: { ...state.boardLists, [action.list.id]: action.list } }
            return newState

        case DELETE_LIST:
            newState = {...state, boardLists: {...state.boardLists } }
            if(newState.boardLists[action.id]) delete newState.boardLists[action.id]
            return newState
        default:
            return state
    }
}

export default listReducer
