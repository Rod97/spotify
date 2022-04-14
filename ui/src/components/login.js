import React, { useState } from "react";
import { Buttons } from "react-native/Libraries/Alert/Alert";
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview'
import base64url from 'base64url'


const Login = () => {
    const [uri, setUri] = useState('');
    const [authCode, setAuthCode] = useState('');

    // const generateChallenge = () => {

    //     const code_verifier = randomString(16);
    //     const base64Digest = crypto.
    //     createHash('sha256')
    //         .update(code_verifier)
    //         .digest('base64');
    //     const code_challenge = base64url.fromBase64(base64Digest);

    //     return code_challenge;
    // }

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
        // fetch(`${url}${queryString}`).then((res) => {
        //     console.log({ res })
        //     setHtmlString('<h1>I have returned</h1>');
        // })
        //     .catch((e) => {
        //         console.log(e)
        //     });
    }

    const handleAuthResponse = (res) => {
        if(res.url.includes('http://localhost/?code=')){
            setUri(`<h1>${res.url.substring(22)}</h1>`);
            setAuthCode(res.url.substring(22));
        }
        console.log(res)
    }
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
                        source={{ uri: uri }}
                        style={{ flex: 1, textColor: 'black' }}
                        onNavigationStateChange={handleAuthResponse} /> :
                    null
            }
        </View>
    )
}

export default Login;