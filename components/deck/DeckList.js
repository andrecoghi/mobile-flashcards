import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../../utils/storage';
import { receiveDecks } from '../../actions';
import { styles } from '../../utils/styles';
import DeckListRow from './DeckListRow';



class DeckList extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        getDecks().then((decks) => dispatch(receiveDecks(decks)));
    };

    deckPressed = (title) => {
        this.props.navigation.navigate(
            'Deck',
            { deckId: title }
        );
    }

    renderItem = ({ item }) => {
        return (
            <DeckListRow key={item.title} item={item} onDeckPressed={this.deckPressed} />
        );
    };

    render() {
        const { decks } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Deck list</Text>
                <FlatList
            data={decks}
            extraData={decks}
            keyExtractor={item => item.title}
            renderItem={({ item }) => {
              return <DeckListRow key={item.title} item={item} onDeckPressed={this.deckPressed} />;
            }}
          />
            </View>
        );
    }
}

function mapStateToProps(decks) {
    return {
        decks: Object.values(decks)
    }
}

export default connect(mapStateToProps)(DeckList);