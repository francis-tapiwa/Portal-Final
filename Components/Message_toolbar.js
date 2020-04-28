import React from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAvoidingView, StyleSheet, SafeAreaView, View, TextInput, Animated, FlatList, Text } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import test from '../test'

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function Item({ icon }) {
    return (
        <View style={{ paddingHorizontal: 2.5 }}>
            <Button
                icon={<AntDesign name={icon} size={24} color="white" />}
                type='solid'
                buttonStyle={{
                    borderRadius: 50,
                    width: 75,
                    height: 40,
                    backgroundColor: '#1D2023', //'#8CB369'
                    borderWidth: .4,
                    borderColor: 'gray'
                }}
            />
        </View>
    );
}

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            to: '',
            messages: [],

            clicked: false,
        }
    }

    componentDidMount() {
        this.setState({ to: 'Velvet' });
    }

    animation = new Animated.Value(0);

    toggle() {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 5
        }).start();

        this.setState({ clicked: true })

        if(this.state.clicked) {
            this.setState({ clicked: false })
        }

        this.open = !this.open
    }


    submit() {
        this.socket.emit('message', this.state.message);
        console.log(this.state.message);
        this.setState({ message: '' });
    }

    send() {
        var d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        const time = h + ":" + m;

        this.state.messages.push(this.state.message);

        fetch('http://192.168.1.82:1400/send', {
            method: 'POST',
            body: JSON.stringify({ 
                message: this.state.message, 
                time: time,
                true_time: new Date().getTime(), 
                from: this.props.displayName, 
                to: this.state.to }),
            headers: { 'Content-Type': 'application/json' }
        })

        this.setState({ message: '' });
        console.log(time);
        console.log(this.state.messages.length)
    }

    render() {

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '45deg']
                    })
                }
            ]
        }

        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <SafeAreaView style={styles.back}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'center' }} >
                        <TextInput
                            style={styles.text}
                            onChangeText={message => {
                                this.setState({ message })
                            }}
                            value={this.state.message}
                            onSubmitEditing={() => this.submit()}
                            placeholderTextColor='#B0B0B0'
                            placeholder='Send a message...'
                            clearButtonMode='always'
                        />
                        <View style={styles.space}>
                            <TouchableWithoutFeedback onPress={() => this.toggle()}>
                                <Animated.View style={rotation}>
                                    <Button
                                        icon={<AntDesign name="plus" size={24} color="white" />}
                                        type='solid'
                                        buttonStyle={{
                                            borderRadius: 50,
                                            width: 40,
                                            height: 40,
                                            backgroundColor: '#F45B69' //'#8CB369'
                                        }}
                                    />
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.space}>
                            <Button
                                icon={<AntDesign name="arrowup" size={24} color="white" />}
                                type='solid'
                                onPress={() => this.send()}
                                buttonStyle={{
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                    backgroundColor: '#1E91D6'
                                }}
                            />
                        </View>
                    </View>
                    <View style={[styles.widgets, !this.state.clicked ? styles.hide : '']}>
                        <View style={{ flexDirection: 'row' }}>
                            <FlatList
                                data={test}
                                renderItem={({ item }) => <TouchableOpacity activeOpacity={0.6} underlayColor='#016FB9'>
                                    <Item icon={item.icon} /></TouchableOpacity>}
                                keyExtractor={item => item.id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        width: 260, //320
        paddingLeft: 10,
        marginRight: 2,
    },
    back: {
        borderTopWidth: 1,
        borderTopColor: '#016FB9',
        backgroundColor: '#24272B',
    },
    space: {
        paddingHorizontal: 5,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    hide: {
        display: 'none'
    },
    item: {
        backgroundColor: '#1D2023',
        borderColor: 'gray',
        borderWidth: .2,
        borderRadius: 40,
        padding: 20,
        marginVertical: 2,
        marginHorizontal: 2,
        width: 50,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center'
    },
})