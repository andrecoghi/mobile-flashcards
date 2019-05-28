import { CREATE_CARD, CREATE_DECK, RECEIVE_DECKS } from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case CREATE_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    cards: []
                }
            };
        case CREATE_CARD:
            return {
                ...state,
                [action.card.title]: {
                    title: action.card.title,
                    cards: [
                        ...state[action.card.title].cards,
                        { question: action.card.question, answer: action.card.answer }
                    ]
                }
            };
        default:
            return state
    }
}

export default decks;