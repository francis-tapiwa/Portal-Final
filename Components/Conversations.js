import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, } from 'react-native';

function ellipsify(str) {
    if (str.length >35) {
        return (str.substring(0, 35) + "...");
    }
    else {
        return str;
    }
}

export default class Conversations extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <SafeAreaView>
                    <View style={styles.inbox}>
                        <View style={styles.message_list}>
                            <Text style={styles.message_sender}>{this.props.recipient}</Text>
                        </View>
                        <View style={styles.message_metadata}>
                            <Text style={styles.message}>{ellipsify(this.props.message)}</Text>
                            <Text style={styles.time}>{this.props.time}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inbox: {
        textAlign: 'left',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderBottomColor: '#3D4041',
        borderBottomWidth: .5,
    },
    message_sender: {
        fontSize: 18,
        color: '#ffffff',
        paddingBottom: 5,
    },
    message_metadata: {
        flexDirection: 'row',
    },
    message: {
        fontSize: 14,
        color: '#ffffff',
        marginRight: 26,
        opacity: .6,
    },
    time: {
        flex: 1,
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'right',
        opacity: .6,
    },
    message_list: {
        // flex: 1,
        flexDirection: 'row',
    },
    unopened: {
        alignSelf: 'flex-end',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: '#016FB9',
        transform: [
            { rotate: '90deg' }
        ],
    }
});