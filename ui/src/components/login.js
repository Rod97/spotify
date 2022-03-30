import React from "react";
import { Buttons } from "react-native/Libraries/Alert/Alert";
import { View, Text, Button} from 'react-native';
 
var str = 'Login'
const urlEncode = () => {
    const str = 'KPZ2TiRJecFS14oDCkxrKeu8p0SoN0McdyeyiMxLSyBGOtrFE3gVgPZhCDjq';
    return btoa(String.fromCharCode.apply(null,
        new Uint8Array(str))).replace(/\+/g, '-')
                             .replace(/\//g, '_')
                             .replace(/=+$/, '')
}

const generateRandomString = (length) => {
    let randomString = (Math.random()*1000).toString(36).substring(3,length+3);
    console.log(randomString.length)
    return randomString
}

const sendRequest = () => {
    const url = 'https://accounts.spotify.com/authorize?'
    const state = '3pHuPfzAduLafTxY9QKj';
    const queryString = `responseType=code&client_id=2478b4b2f2434c329b2f14deee0c4e9a&scope=streaming&redirect_uri=%2F&state=${state}&code_challenge_method=S256&code_challenge=${urlEncode()}`;

    fetch(`${url}${queryString}`).then((code, state) => console.log({code, state}));
}
const Login = () => {
   

    return (
       
            <Button 
                onPress = { sendRequest }
                title = {str}
                color = 'black'
            />
    )
}

export default Login;