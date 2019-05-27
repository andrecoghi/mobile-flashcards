import React, { Component } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as actions from '../../actions';
import * as storage from '../../utils/storage';
import { connect } from 'react-redux';
import { styles } from '../../utils/styles';

class NewDeck extends Component {
    state = {
        title: ''
    };

    submit = () => {
        if (this.state.title) {
            const { dispatch } = this.props;
            const { title } = this.props;

            dispatch(actions.createDeck(title));
            storage.createDeck(title);

            this.setState({ title: '' });
            Keyboard.dismiss();
            this.props.navigation.navigate('Deck', { deckId: title });
        }
        else {
            alert('Deck name is empty!');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>New deck</Text>
                <Text style={styles.formLabel}>Deck name</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submit}>
                    <Text style={styles.buttonText}>Add deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect()(NewDeck);