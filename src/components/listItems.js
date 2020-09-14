import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'


import api from '../services/api'

function ListItem({ data, navigation }) {
    const [level, setLevel] = useState(data.level)

    //desativar usuário
    async function desativar(idUser) {

        try {
            Alert.alert('Alerta', 'Deseja mesmo desativar esse usuário?', [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim', onPress: async () => {
                        await api.put('/application/' + idUser, {
                            level: 0,
                        })
                        setLevel(0)
                    }
                },
            ])
        } catch (err) {
            Alert.alert('Não é possível desativar esse usuário')
        }
    }

    //ativar usuário
    async function ativar(idUser) {
        try {
            const usuarios = await api.put('/application/' + idUser, {
                level: 1,
            })
            setLevel(1)

        } catch (err) {
            Alert.alert('Não é possível desativar esse usuário')
        }
    }

    async function editar(user) {
        try {
            await AsyncStorage.setItem('@CodeApi:editUser', JSON.stringify(user))
            navigation.navigate('alterar')

        } catch (err) {
            console.log(err)
        }
    }

    function rightActions() {
        return (

            <View>
                {level === 0 ?
                    <TouchableOpacity style={styles.buttonAtivar} onPress={() => ativar(data._id)}>
                        <Text style={styles.textButton}>Ativar</Text>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity style={styles.buttonDesativar} onPress={() => desativar(data._id)}>
                        <Text style={styles.textButton}>Desativar</Text>
                    </TouchableOpacity>
                }
            </View>

        )
    }

    return (
        <Swipeable renderRightActions={rightActions}>
            <TouchableOpacity style={styles.container} onPress={() => editar(data)}>
                <View style={styles.divImage}>
                    <Image style={styles.imageUser}
                        source={require('../../assets/ImageUserExample.jpg')} />
                </View>
                <View style={styles.divInfo}>
                    <Text style={styles.text}>Nome: {data.name}</Text>
                    <Text style={styles.text}>CPF: {data.cpf}</Text>
                    {level === 0 ?
                        <Text style={styles.textDesativado}>Desativado</Text>
                        :
                        <Text style={styles.text}>Nivel: {level}</Text>
                    }

                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        height: 100,
    },
    text: {
        fontSize: 17,
    },
    textDesativado: {
        fontSize: 17,
        color: '#ff0000',
    },
    divImage: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: '25%',
        height: '100%',
    },
    imageUser: {
        borderWidth: 3,
        maxWidth: 70,
        maxHeight: 70,
        borderRadius: 100,
        marginLeft: 5,
    },
    divInfo: {
        flex: 1,
        width: '70%',
        justifyContent: 'center',
    },
    buttonDesativar: {
        backgroundColor: '#ff0000',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAtivar: {
        backgroundColor: '#2BAE66FF',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
    },
})

export default ListItem
