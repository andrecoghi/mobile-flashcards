import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';

export default function FlashCardsStatusBar() {
    return(
        <View style={{ backgroundColor: '#171F33', height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={'#87ceeb'} barStyle="light-content" />
        </View>
    )
}