import React, { Component } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class DeckListRow extends Component {
    state = {
        opacity: new Animated.Value(1),
        rotateY: new Animated.Value(0)
    };

    deckPressed(title) {
        Animated.parallel([
            Animated.timing(this.state.rotateY, {
                toValue: 360,
                duration: 600
            })
        ]).start(() => {
            this.setState({ rotateY: new Animated.Value(0), opacity: new Animated.Value(1) });
            this.props.onDeckPressed(title);
        });
    }

    render() {
        const { item } = this.props;

        const rotateProp = this.state.rotateY.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        })
        
        const transformProp = [
            { rotateY: rotateProp },
            { perspective: 2000 }
        ]

        return (
            <TouchableOpacity key={item.title}
                style={[style.deck]}
                onPress={() => this.deckPressed(item.title)}>

                <Animated.View style={{
                    opacity: this.state.opacity,
                    transform: transformProp
                }}>
                    <Text style={style.deckTitle}>{item.title}</Text>
                    <Text>{item.cards.length} cards</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    deck: {
        borderTopColor: '#a9a9a9',
        borderTopWidth: 1,
        paddingBottom: 18,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 18
    },
    deckTitle: {
        fontSize: 20,
        paddingBottom: 3
    }
});