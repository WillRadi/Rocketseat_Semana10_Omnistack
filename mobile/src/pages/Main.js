import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity } from 'react-native'
// a importação pode ser sem as {} pois o MapView é a exportação padrão do React Native Maps
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }) {
    // definindo estados:
    const [currentRegion, setCurrentRegion] = useState(null)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState('')

    // executar algo assim q a página é carregada
    useEffect(() => {
        async function loadInitialPosition() {
            // buscar na doc do expo, como obter localização do usuário: expo-location
            // requestPermissionsAsync() retorna um obj com variáveis importantes: granted é uma delas.
            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const coords = await getCurrentPositionAsync({
                    // usa o GPS p pegar a localização
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords
                // Agora, essas informações precisam ser manipuladas. Ou seja, deve-se usar um estado
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition()
    }, [])

    // método que será disparado ao pressionar o botão de busca
    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        // a resposta é um objeto (.data) com um array chado devs (.devs)
        setDevs(response.data.devs)
    }

    function handleRegionChanged(region) {        
        // region vem por default da propriedade onRegionChangeComplete
        setCurrentRegion(region)
    }

    if(!currentRegion) {
        return null
    }

    // passar também para o MapViee a PROPRIEDADE initialRegion
    return (
        // não posso ter dois formulários juntos sem nada encapsulando, deve ser usado a tag de mentira:
        <>
        <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
            {/* Add conteúdo dentro da "tag"(componente) MapView */}
            {devs.map(dev => (
                <Marker
                    key={dev._id}
                    coordinate={{ 
                        longitude: dev.location.coordinate[0],
                        latitude: dev.location.coordinate[1]
                    }}>
                    {/* Imagem sempre precisa de style */}
                    <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                    {/* O que colocar dentro, é o q vai aparecer ao clicar no avatar */}
                    {/* Toda página declarada no routes, recebe a propriedade navigation */}
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: dev.github_username })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>{dev.name}</Text>
                            <Text style={styles.devBio}>{dev.bio}</Text>
                            <Text style={styles.devTechs}>{dev.techs.joiin(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
            ))}
        </MapView>
        {/* Se eu quero ter algo que fique por cima do mapa, deve ser colocado depois do mapa */}
        <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                // modo verboso: onChangeText={Text => setTechs(Text)}
                onChangeText={setTechs}
            />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main