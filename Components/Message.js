import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';

export default class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container, this.props.from !== this.props.displayName ? styles.guest : styles.user}>
            {this.props.from !== this.props.displayName && (
                <Card
                    containerStyle={{
                        maxWidth: 320,
                        minHeight: 50,
                        backgroundColor: '#46494C',
                        borderRadius: 10,
                        borderColor: 'transparent',
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    <Text style={styles.text}>{this.props.message}</Text>
                </Card>
            )}

            {this.props.from === this.props.displayName && (
                <Card
                    containerStyle={{
                        maxWidth: 290,
                        minHeight: 50,
                        backgroundColor: '#016FB9',
                        borderRadius: 10,
                        borderColor: 'transparent',
                        marginBottom: 0,
                        marginTop: 0,
                    }}
                >
                    <Text style={styles.text}>{this.props.message}</Text>
                </Card>
            )}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { 
        marginBottom: 10,
    },
    text: {
        color: 'white',
    },
    user: {
        flexDirection: 'row-reverse',
        marginBottom: 8,
    },
    guest: {
        flexDirection: 'row',
        marginBottom: 8,
    },
})