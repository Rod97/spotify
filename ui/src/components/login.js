import React, { useState } from "react";
import { Buttons } from "react-native/Libraries/Alert/Alert";
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview'
import base64url from 'base64url'
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";


const Login = ({navigation}) => {
    const [uri, setUri] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [html, setHtml] = useState('');

    const randomString = (length) => {
        let randString = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv123456789-._~'
        const charactersLength = chars.length;

        for (let i = 0; i < length; i++) {
            randString += chars.charAt(Math.floor(Math.random() * charactersLength));
        }

        return randString
    }

    const sendRequest = () => {
        const url = 'https://accounts.spotify.com/authorize?'
        const client_id = '2478b4b2f2434c329b2f14deee0c4e9a'
        const response_type = 'code';
        const redirect_uri = 'http://localhost'
        const scope = 'user-read-email';
        // const code_challenge_method = 'S256';
        // const code_challenge = generateChallenge();
        const queryString = `client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&show_dialog=true`;
        // &${code_challenge_method}&${code_challenge}`;

        setUri(`${url}${queryString}`)
    }

    const handleAuthResponse = (res) => {
        if (res.url.includes('http://localhost/?code=')) {
            setUri('');
            setAuthCode(res.url.substring(22));
            navigation.navigate('Song')
        }
    }
    console.log('rendering login')
    return (
        <View
            style={{ flex: 1, color: 'black' }}>
            <Button
                onPress={sendRequest}
                title='Login'
                color='black'
            />
            {
                uri ?
                    <WebView
                        source={{ uri: uri, html: html }}
                        style={{ flex: 1, textColor: 'black' }}
                        onNavigationStateChange={handleAuthResponse} /> :
                    null
            }
        </View>
    )
}

export default Login;