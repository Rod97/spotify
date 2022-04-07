import React, { useState } from "react";
import { Buttons } from "react-native/Libraries/Alert/Alert";
import { View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview'
import randomstring from 'randomstring';
import base64url from 'base64url'


const Login = () => {
    const [htmlString, setHtmlString] = useState('')

    const generateChallenge = () => {
        console.log(randomstring.generate())
        // const code_verifier = randomstring.generate(128);
        // return code_verifier;
        // const base64Digest = crypto.createHash('sha256')
        //     .update(code_verifier)
        //     .digest('base64');
        // const code_challenge = base64url.fromBase64(base64Digest);

        // return code_challenge;
    }

    const sendRequest = () => {
        const url = 'https://accounts.spotify.com/authorize?'
        const client_id = '2478b4b2f2434c329b2f14deee0c4e9a'
        const response_type = 'code';
        const redirect_uri = 'http://localhost'
        const scope = 'user-read-email';
        const code_challenge_method = 'S256';
        const code_challenge = generateChallenge();
        const queryString = `${client_id}&${response_type}&${redirect_uri}&${scope}&${code_challenge_method}&${code_challenge}`;

        fetch(`${url}${queryString}`).then((res) => {
            console.log({ res })
            setHtmlString('<h1>I have returned</h1>');
        })
            .catch((e) => {
                console.log(e)
            });
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
                htmlString ?
                    <WebView
                        source={{ html: htmlString }}
                        style={{ flex: 1, textColor: 'black' }} /> :
                    null
            }
        </View>
    )
}

export default Login;