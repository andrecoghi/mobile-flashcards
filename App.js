import React from 'react';
import { View, Platform } from 'react-native';
import DeckStatusBar from './components/deck/DeckStatusBar';
import reducer from './reducers'
import Deck from './components/deck/Deck';
import { Feather } from '@expo/vector-icons';
import { createStore } from 'redux'
import {
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import DeckList from './components/deck/DeckList';
import NewDeck from './components/deck/NewDeck';
import { Provider } from 'react-redux'
import AddCard from './components/card/AddCard';
import Quiz from './components/quiz/Quiz';
import { setLocalNotification } from './utils/notifications';

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <DeckStatusBar />
                    <AppNavigation />
                </View>
            </Provider>
        );
    }
}

const Tabs = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Deck list',
            tabBarIcon: ({ tintColor }) => (
                <Feather name="list" size={30} color={tintColor} />
            )
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New deck',
            tabBarIcon: ({ tintColor }) => (
                <Feather name="plus" size={30} color={tintColor} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#778899',
            labelStyle: {
                fontSize: 14
            },
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#171F33',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    });

const AppNavigation = createStackNavigator(
    {
        Home: Tabs,
        Deck: Deck,
        AddCard: AddCard,
        Quiz: Quiz
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            header: null,
            headerTintColor: '#ffffff',
            headerStyle: { backgroundColor: '#778899' },
            headerTitleStyle: { fontWeight: "bold" },
            style: {
                activeTintColor: '#778899',
                inactiveTintColor: '#778899',
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#171F33',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    });