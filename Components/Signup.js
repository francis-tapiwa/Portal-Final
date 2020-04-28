import React from 'react';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            email: '',
            imageURL: ''
        }
    }

    register() {
        fetch('http://192.168.1.82:1400/create', {
            method: 'POST',
            body: JSON.stringify({ 
                username: this.state.userName, 
                password: this.state.password,
                email: this.state.email,
                imageURL: this.state.imageURL 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        this.setState({ username: '' });
        this.setState({ password: '' });
        this.setState({ email: '' });
        this.setState({ imageURL: '' });
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.container}>
                    <Text style={styles.portal_text}>Join</Text>
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={'#939596'}
                        style={styles.secondaryText}
                        onChangeText={userName => this.setState({ userName })}
                    />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#939596'}
                        style={styles.secondaryText}
                        onChangeText={password => this.setState({ password })}
                    />
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={'#939596'}
                        style={styles.secondaryText}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        placeholder='imageURL'
                        placeholderTextColor={'#939596'}
                        style={styles.secondaryText}
                        onChangeText={imageURL => this.setState({ imageURL })}
                    />
                    <Button
                        onPress={() => this.register()}
                        buttonStyle={{
                            borderRadius: 50,
                            width: 80,
                            height: 80,
                            marginTop: 40,
                            backgroundColor: '#016FB9',
                        }}

                        containerStyle={{
                            alignItems: 'center'
                        }}

                        icon={
                            <AntDesign
                                name="arrowright"
                                size={26}
                                color="white"
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        fontFamily: 'SF-Pro-Display-Regular',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1D2023',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    portal_text: {
        fontSize: 70,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Orbitron-Medium',
    },
    secondaryText: {
        fontSize: 20,
        marginTop: 20,
        color: '#ffffff',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        width: 300,
    },
    alternateText: {
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 30,
    },
    decorate: {
        textDecorationLine: 'underline'
    },
});