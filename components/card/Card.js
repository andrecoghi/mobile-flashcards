import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../../utils/styles';

export function Card(props) {
    const { index, showQuestion, cards: cards, onQuestionPress, onButtonPress } = props,
        question = cards[index].question,
        answer = cards[index].answer;

    const styleCard = StyleSheet.create({
        count: {
            padding: 11
        },
        answer: {
            fontSize: 23,
            paddingBottom: 5,
            paddingLeft: 11,
            paddingRight: 11
        },
        toggleAnswer: {
            color: '#171F33',
            fontSize: 17
        },
        correctButton: {
            backgroundColor: '#008000'
        },
        incorrectButton: {
            backgroundColor: '#ff0000'
        }
    });

    return <View style={styles.container}>
        <Text style={styleCard.count}>{index + 1} / {cards.length}</Text>

        <View style={{ flex: 0.8, justifyContent: 'flex-end', alignItems: 'center' }}>
            {showQuestion &&
                <Text style={styleCard.answer}>{question}</Text>
            }

            {!showQuestion &&
                <Text style={styleCard.answer}>{answer}</Text>
            }

            <TouchableOpacity
                onPress={onQuestionPress}>
                <Text style={styleCard.toggleAnswer}>Show {showQuestion ? 'Answer' : 'Question'}</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
                style={[styles.button, styleCard.correctButton]}
                onPress={() => onButtonPress(true)}>
                <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styleCard.incorrectButton]}
                onPress={() => onButtonPress(false)}>
                <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>
        </View>
    </View>
}
