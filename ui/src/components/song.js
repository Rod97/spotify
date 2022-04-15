import React from "react";
import { View, Text, Button } from 'react-native';

const Song = ({ navigation }) => {
    const handleButton = () => {
        navigation.navigate('Login')
    }
    return (
        <View
            style={{ flex: 1 }}
        >
            <Button
                title='Back to login'
                color='orange'
                onPress={handleButton}
            />
        </View>
    )
}

export default Song;