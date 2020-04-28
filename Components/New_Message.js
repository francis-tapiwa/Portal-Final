import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function portal() {
    return (
        <View style={styles.opacity}>
            <Text style={styles.portal_text}>Portal</Text>
            <Text style={styles.secondaryText}>New conversation with Toni</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        fontFamily: 'SF-Pro-Display-Regular',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1D2023',
    },
    opacity:{
        opacity: 0.4
    },
    portal_text: {
        fontSize: 22,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Orbitron-Medium',
    },
    secondaryText: {
        fontSize: 16,
        color: '#ffffff',
        paddingBottom: 10,
        textAlign: 'center'
    },
})
