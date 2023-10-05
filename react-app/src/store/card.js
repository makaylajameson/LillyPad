// Action
const CREATE_CARD = 'cards/CREATE_CARD';
const EDIT_CARD = 'cards/EDIT_CARD';
const DELETE_CARD = 'cards/DELETE_CARD';

// Action Creator
const createCard = (card) => ({
    type: CREATE_CARD,
    card
});

const editCard = (card) => ({
    type: EDIT_CARD,
    card
});

const deleteCard = (id) => ({
    type: DELETE_CARD,
    id
});

// Thunks
export const createCardThunk = (formData, listId) => async (dispatch) => {
    const response = await fetch('/api/cards/new-card', {
        method: "POST",
        body: formData
    })

    if (response.ok) {
        const card = await response.json()
        dispatch(createCard(card, listId))
        return card;
    } else {
        const data = await response.json()
        return data
    }
}

export const editCardThunk = (id, formData) => async (dispatch) => {
    console.log("FORM DATA-------", formData)
    console.log("ID---------", id)
    const response = await fetch(`/api/cards/${id}`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const card = await response.json()
        await dispatch(editCard(card))
        return card;
    } else {
        const data = await response.json()
        return data
    }
}


export const deleteCardThunk = (cardId) => async (dispatch) => {
    const response = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

    })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteCard(cardId))
        return data
    } else {
        const data = await response.json()
        return data
    }
}

const initialState = {
    cards: {},
    singleCard: {}
}

// Reducer
const cardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_CARD:
            return { ...state, cards: { ...state.cards, [action.card.id]: action.card } }

        case EDIT_CARD:
            newState = { ...state, cards: { ...state.cards, [action.card.id]: action.card }, singleCard: { ...state.singleCard } }
            // if (newState.singleCard[action.card.id]) newState.singleCard[action.card.id] = action.card
            return newState

        case DELETE_CARD:
            newState = { ...state, cards: { ...state.cards } }
            if (newState.cards[action.id]) delete newState.cards[action.id]
            return newState

        default:
            return state
    }
}

export default cardReducer
