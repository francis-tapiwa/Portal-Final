import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, StyleSheet, View } from 'react-native';
import { Header, Avatar, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class Top extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.main_container}>
                <Header style={styles.fit}
                    leftComponent={
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                icon={<AntDesign name="left" size={24} color="white" />}
                                type='clear'
                                onPress={() => this.props.navigation.goBack()}
                                buttonStyle={{
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                    paddingLeft: 0,
                                }}
                            />
                            <Text style={styles.place}>Inbox</Text>
                        </View>
                    }
                    rightComponent={<Avatar rounded source={require('../assets/Images/2.jpg')} />}
                    containerStyle={{
                        backgroundColor: '#24272B',
                        borderBottomWidth: 1,
                        borderBottomColor: '#016FB9',
                        height: 120,
                        paddingRight: 20,
                        paddingLeft: 15,
                        paddingBottom: 10,
                    }}
                />
            </View>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Top {...props} navigation={navigation} />;
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
    place: {
        textAlignVertical: 'center',
        fontSize: 18,
        color: '#ffffff',
        paddingTop: 8,
        fontFamily: 'Orbitron-Medium',
    }
});