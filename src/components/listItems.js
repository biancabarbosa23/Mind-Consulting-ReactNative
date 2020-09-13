import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import api from '../services/api'

function ListItem({ data }) {
    const [users, setUsers] = useState(data)

    async function desativar(idUser) {
        try {
            Alert.alert('Alert', 'Deseja mesmo desativar esse usuário?', [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim', onPress: async () => {

                        const response = await api.put('/application/' + idUser, {
                            level: 0,
                        })


                    }

                },
            ])
        } catch (err) {
            console.log(err)
        }
    }

    async function ativar() {

    }

    function rightActions() {
        return (

            <View>
                {data.level === 0 ?
                    <TouchableOpacity style={styles.buttonAtivar} onPress={ativar()}>
                        <Text style={styles.textButton}>Ativar</Text>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity style={styles.buttonDesativar} onPress={() => desativar(users._id)}>
                        <Text style={styles.textButton}>Desativar</Text>
                    </TouchableOpacity>
                }
            </View>

        )
    }

    return (
        <Swipeable renderRightActions={rightActions} >
            <TouchableOpacity style={styles.container} >
                <View style={styles.divImage}>
                    <Image style={styles.imageUser}
                        source={require('../../assets/ImageUserExample.jpg')} />
                </View>
                <View style={styles.divInfo}>
                    <Text style={styles.text}>Nome: {users.name}</Text>
                    <Text style={styles.text}>CPF: {users.cpf}</Text>
                    {users.level === 0 ?
                        <Text style={styles.textDesativado}>Desativado</Text>
                        :
                        <Text style={styles.text}>Nivel: {users.level}</Text>
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
