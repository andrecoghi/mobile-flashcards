import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { styles } from '../../utils/styles';
import { Card } from '../card/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { clearLocalNotification, setLocalNotification } from '../../utils/notifications';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
    state = {
        cards: [],
        currentQuestionIdx: 0,
        showQuestion: true
    };

    static navigationOptions = () => {
        return {
            title: 'Quiz'
        }
    };

    componentDidMount() {
        const { decks, navigation } = this.props;

        const deck = Object.values(decks).find(
            deck => {
                return deck.title === navigation.state.params.deckId;
            }
        );

        const cards = deck.cards.map((question) => {
            return {
                question: question.question,
                answer: question.answer,
                correct: false
            }
        });

        this.setState({ cards: cards });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    resetQuiz = () => {
        const cards = this.state.cards.map((question) => {
            return { question: question.question, answer: question.answer, correct: false }
        });

        this.setState({ cards, currentQuestionIdx: 0, showQuestion: true });
    };

    handleButtons = (status) => {
        const cards = this.state.cards;
        cards[this.state.currentQuestionIdx].correct = status;
        this.setState({ cards, currentQuestionIdx: this.state.currentQuestionIdx + 1, showQuestion: true });
    };

    toggleQuestion = () => {
        this.setState({ showQuestion: !this.state.showQuestion });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.cards.length > 0 &&
                    this.state.currentQuestionIdx < this.state.cards.length &&
                    <Card index={this.state.currentQuestionIdx}
                        showQuestion={this.state.showQuestion}
                        cards={this.state.cards}
                        onQuestionPress={this.toggleQuestion}
                        onButtonPress={this.handleButtons}
                    />
                }
                {this.state.cards.length > 0 &&
                    this.state.currentQuestionIdx >= this.state.cards.length &&
                    <View style={styles.container}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            {this.state.cards.filter(question => question.correct).length === this.state.cards.length &&
                                <MaterialCommunityIcons size={60} style={styleQuiz.checkmarkIcon} name="check-circle" />
                            }
                            {this.state.cards.filter(question => question.correct).length !== this.state.cards.length &&
                                <MaterialCommunityIcons size={60} style={styleQuiz.alertIcon} name="alert-circle" />
                            }
                            <Text style={styleQuiz.quizDoneText}>You've
                            got {this.state.cards.filter(question => question.correct).length} out
                            of {this.state.cards.length} questions correct
                            ({Math.round(this.state.cards.filter(question => question.correct).length / this.state.cards.length * 100)}%).
                        </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={[styles.button, styleQuiz.backToDeckButton]}
                                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
                                <Text style={styles.buttonText}>Back to Deck</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.resetQuiz}>
                                <Text style={styles.buttonText}>Restart Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {this.state.cards.length === 0 &&
                    <Text style={styleQuiz.noQuestions}>This deck is empty.</Text>
                }
            </View>
        );
    }
}

const styleQuiz = StyleSheet.create({
    noQuestions: {
        fontSize: 24,
        padding: 12
    },
    quizDone: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkmarkIcon: {
        color: '#228b22',
        marginBottom: 12
    },
    alertIcon: {
        color: '#ff4500',
        marginBottom: 12
    },
    quizDoneText: {
        fontSize: 24,
        textAlign: 'center'
    },
    backToDeckButton: {
        backgroundColor: '#778899'
    }
});

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz);