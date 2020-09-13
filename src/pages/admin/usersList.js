import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    SafeAreaView,
    AsyncStorage,
    Alert,
    FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import listItems from '../../components/listItems'
import api from '../../services/api'
import ListItems from '../../components/listItems'


function UsersList() {
    const [users, setUsers] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        (async () => {
            const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
            setUserId(user._id)

            const response = await api.get('/application/usuarios',
                { id: userId }
            )
            setUsers(response.data.users)
        })()
    })



    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.divLogo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/Mind-Branco.png')}
                />
            </View>
            <Text style={styles.textInformativo}>
                Arraste para a direita para desativar ou ativar um usuário</Text>
            <View style={styles.container}>
                <FlatList
                    data={users}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (<ListItems data={item} />)}
                    ItemSeparatorComponent={() => <View backgroundColor="#181818" height={2} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    divLogo: {
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    textInformativo: {
        fontSize: 15,
        marginBottom: 10,
        marginTop: 5,
    },
})

export default UsersList