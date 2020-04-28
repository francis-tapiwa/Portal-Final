import React, { useEffect, useState } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import Header from './Message_Header';
import Messages from './Message';
import Toolbar from './Message_toolbar';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

export default function Chats() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState('');
    const abortController = new AbortController();

    useEffect(() => {
        fetch('http://192.168.1.82:1400/chats')
            .then((response) => response.json())
            .then((json) => setData(json.messages))
            .catch((error) => console.error(error))

        const updateUser = async () => {
            let displayName;

            try {
                displayName = await AsyncStorage.getItem('user');
                setUser(displayName)
            } catch (e) {
                console.log('An error occured retreiving value...')
            }
        };

        updateUser();
        // abortController.abort();
    }, []);

    return (
        <View style={styles.main_container}>
            <Header />
            <FlatList
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Messages key={item._id} message={item.message} from={item.from} displayName={user} />}
                inverted={true}
            />
            <Toolbar displayName={user} />
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        fontFamily: 'SF-Pro-Display-Regular',
        backgroundColor: '#1D2023',
    },
})