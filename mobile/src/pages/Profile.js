import React from 'react'
import { WebView } from 'react-native-webview'

function Profile({ navigation }) {
    // Pegar parâmetro que vem da página Main, de dentro do callout.onPress()
    const githubUsername = navigation.getParam('github_username')
    
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}

export default Profile