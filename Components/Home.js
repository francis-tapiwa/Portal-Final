import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Header from './Main_Header';
import Conversations from './Conversations';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
    const [data, setData] = useState([]);
    const [updating, update] = useState(false);
    const abortController = new AbortController();

    useEffect(() => {
        fetch('http://192.168.1.82:1400/messages')
            .then((response) => response.json())
            .then((json) => setData(json.messages))
            .catch((error) => console.error(error))
            abortController.abort();
    });

    function refresh() {
        update(true);
        request();
        console.log('refreshed!');
    }

    function request() {
        fetch('http://192.168.1.82:1400/messages')
            .then((response) => response.json())
            .then((json) => setData(json.messages))
            .catch((error) => console.error(error));
            update(false);
            abortController.abort();
    }

    return (
        <View style={styles.main_container}>
            <Header />
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <TouchableHighlight activeOpacity={0.6} underlayColor='#016FB9' onPress={() => navigation.navigate('Chats')}>
                    <Conversations key={item._id} recipient={item.from} message={item.message} time={item.time} />
                </TouchableHighlight>}
                refreshing={updating}
                onRefresh={() => refresh()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        fontFamily: 'SF-Pro-Display-Regular',
        justifyContent: 'flex-start',
        backgroundColor: '#1D2023',
    },
})