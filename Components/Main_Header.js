import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    newMessage(){
        console.log('New Messsage');
        this.props.navigation.navigate('Chats');
    }

    render() {
        const { navigation } = this.props;
        
        return (
            <View style={styles.main_container}>
                <Header
                    style={styles.fit}
                    leftComponent={<Text style={styles.portal_text}>Portal</Text>}
                    rightComponent={
                        <View style={{flexDirection: 'row'}}>
                        <Button
                            onPress={() => this.newMessage()}
                            buttonStyle={{
                                borderRadius: 50,
                                width: 35,
                                height: 35,
                                backgroundColor: '#016FB9',
                            }}

                            containerStyle={{
                                alignItems: 'center'
                            }}

                            icon={
                                <AntDesign
                                    name="plus"
                                    size={20}
                                    color="white"
                                />
                            }
                        />
                        <Button
                            onPress={() => this.newMessage()}
                            buttonStyle={{
                                borderRadius: 50,
                                width: 35,
                                height: 35,
                                backgroundColor: '#F45B69',
                                marginLeft: 12
                            }}

                            containerStyle={{
                                alignItems: 'center'
                            }}

                            icon={
                                <AntDesign
                                    name="poweroff"
                                    size={20}
                                    color="white"
                                />
                            }
                        />
                        </View>
                    }
                    containerStyle={{
                        backgroundColor: '#24272B', //'#141414',
                        borderBottomWidth: 1,
                        borderBottomColor: '#016FB9',
                        height: 120,
                        paddingRight: 20,
                        paddingLeft: 15,
                        paddingBottom: 10,
                    }}
                />
            </View>
        )
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Main {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
    fit: {
        flex: 1,
        flexDirection: 'row',
    },
    spacing: {
        paddingRight: 10,
    },
    custom: {
        backgroundColor: '#46494C',
    },
    portal_text: {
        fontSize: 19.5,
        color: '#ffffff',
        fontFamily: 'Orbitron-Medium',
    },
});