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
        questions: [],
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

        const questions = deck.questions.map((question) => {
            return {
                question: question.question,
                answer: question.answer,
                correct: false
            }
        });

        this.setState({ questions });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    resetQuiz = () => {
        const questions = this.state.questions.map((question) => {
            return { question: question.question, answer: question.answer, correct: false }
        });

        this.setState({ questions, currentQuestionIdx: 0, showQuestion: true });
    };

    handleButtons = (status) => {
        const questions = this.state.questions;
        questions[this.state.currentQuestionIdx].correct = status;
        this.setState({ questions, currentQuestionIdx: this.state.currentQuestionIdx + 1, showQuestion: true });
    };

    toggleQuestion = () => {
        this.setState({ showQuestion: !this.state.showQuestion });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.questions.length > 0 &&
                    this.state.currentQuestionIdx < this.state.questions.length &&
                    <Card index={this.state.currentQuestionIdx}
                        showQuestion={this.state.showQuestion}
                        questions={this.state.questions}
                        onQuestionPress={this.toggleQuestion}
                        onButtonPress={this.handleButtons}
                    />
                }
                {this.state.questions.length > 0 &&
                    this.state.currentQuestionIdx >= this.state.questions.length &&
                    <View style={styles.container}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            {this.state.questions.filter(question => question.correct).length === this.state.questions.length &&
                                <MaterialCommunityIcons size={60} style={styleQuiz.checkmarkIcon} name="check-circle" />
                            }
                            {this.state.questions.filter(question => question.correct).length !== this.state.questions.length &&
                                <MaterialCommunityIcons size={60} style={styleQuiz.alertIcon} name="alert-circle" />
                            }
                            <Text style={styleQuiz.quizDoneText}>You've
                            got {this.state.questions.filter(question => question.correct).length} out
                            of {this.state.questions.length} questions correct
                            ({Math.round(this.state.questions.filter(question => question.correct).length / this.state.questions.length * 100)}%).
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
                {this.state.questions.length === 0 &&
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