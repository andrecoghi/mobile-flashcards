import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        backgroundColor: '#778899',
        color: '#ffffff',
        fontSize: 24,
        textAlign: 'center',
        padding: 12
    },
    container: {
        flex: 1
    },
    formLabel: {
        fontSize: 18,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12
    },
    formInput: {
        borderColor: '#a9a9a9',
        borderWidth:  1,
        paddingBottom: 12,
        paddingLeft: 6,
        paddingTop: 12,
        marginLeft: 12,
        marginRight: 12
    },
    button: {
        backgroundColor: '#171F33',
        borderRadius: 2,
        margin: 12,
        paddingBottom: 12,
        paddingTop: 12
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    }
});