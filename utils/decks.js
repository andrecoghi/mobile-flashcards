import { AsyncStorage } from 'react-native';

export const FLASHCARDS_STORAGE_KEY = 'decks:mobile-flashxxcards';

export function formatDeckResults(results) {
    return results === null
        ? setInitData()
        : JSON.parse(results);
}

async function setInitData() {
    const initData = {
        ['General Trivia']: {
            title: 'General Trivia',
            cards: [
                {
                    question: `Which nail grows fastest?`,
                    answer: 'middle.'
                },
                {
                    question: `What temperature does water boil at?`,
                    answer: '100C.'
                },
                {
                    question: `Who discovered penicillin?`,
                    answer: 'Fleming.'
                },
                {
                    question: `Where is the smallest bone in the body?`,
                    answer: 'ear.'
                }
            ]
        },
        ['Cartoon']: {
            title: 'Cartoon',
            cards: [
                {
                    question: `Which character was Walt Disney’s favorite?`,
                    answer: 'Goofy.'
                },
                {
                    question: `Who is the quietest Disney princess?`,
                    answer: 'Aurora.'
                },
                {
                    question: `Which princess has dyed hair?`,
                    answer: 'Rapunzel.'
                },
                {
                    question: `Who refused to play the part of the vultures in The Jungle Book?`,
                    answer: 'The Beatles'
                },
                {
                    question: `Which two characters did the same actor voice?`,
                    answer: 'Eeyore from Winnie the Pooh and Optimus Prime from Transformers'
                }
            ]
        }
    };
    try {
        await AsyncStorage.setItem(
            FLASHCARDS_STORAGE_KEY,
            JSON.stringify(initData)
        ).then(data => data);
    } catch (e) {
        console.log("InitData Error", e);
    }

    return initData;
}