export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const CREATE_DECK = 'CREATE_DECK';
export const CREATE_CARD = 'CREATE_CARD';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function createDeck(title) {
    return {
        type: CREATE_DECK,
        title
    }
}

export function createCard(title, question, answer) {
    return {
        type: CREATE_CARD,
        card: { title, question, answer }
    }
}