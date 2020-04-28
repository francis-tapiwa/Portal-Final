import React from 'react';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            token: '',
            user: '',
        }
    }

    logIn() {
        fetch('http://192.168.1.82:1400/loginUser', {
            method: 'POST',
            body: JSON.stringify({ username: this.state.userName, password: this.state.password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ token: responseJSON.token });
                this.setState({ user: responseJSON.user });
            })
            .then(
                _storeData = async () => {
                    try {
                        await AsyncStorage.multiSet([['token', this.state.token], ['user', this.state.user]]);
                    } catch (error) {
                        console.log('An error occured');
                    }
                }
            )

        this.setState({ username: '' });
        this.setState({ password: '' });
    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.container}>
                    <Text style={styles.portal_text}>Portal</Text>
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
                        secureTextEntry
                    />
                    <Button
                        onPress={() => this.logIn()}
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
                    <TouchableHighlight activeOpacity={0.6} underlayColor='#016FB9' onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.alternateText}> <Text style={styles.decorate}>Sign Up</Text> today...</Text>
                    </TouchableHighlight>
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