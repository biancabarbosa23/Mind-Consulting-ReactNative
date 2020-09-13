//Importação do HOOkS
import React, { useEffect, useState } from 'react'
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
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../services/api'

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@CodeApi:token')
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
    })()
  })

  async function logar() {
    //enviando o usuário e senha
    try {
      const response = await api.post('/auth/login', {
        usuario,
        password,
      })

      //pegando usuário e o token
      const { user, token } = response.data

      //setando user e o token no AsyncStorage
      await AsyncStorage.multiSet([
        ['@CodeApi:token', token],
        ['@CodeApi:user', JSON.stringify(user)],
      ])


      if (user.level === 1) {
        navigation.navigate('usuario')
      } else if (user.level === 999) {
        navigation.navigate('administrador')
      } else {
        Alert.alert('Usuário desativado!')
      }

    } catch (err) {
      Alert.alert('Usuário ou senha incorretos')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.divLogo}>
        <Image
          style={styles.logo}
          source={require('../../assets/Mind-Branco.png')}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Insira seu E-mail ou CPF"
          style={styles.input}
          onChangeText={(value) => setUsuario(value)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry="true"
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity style={styles.btnEntrar} onPress={logar}>
          <Text style={styles.btnTextEntrar}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCadastro}
          onPress={() => navigation.navigate('cadastro')}
        >
          <Text style={styles.btnTextCadastro}>Criar uma conta</Text>
        </TouchableOpacity>
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
    height: '25%',
    width: '100%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#dddd',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 15,
  },
  btnEntrar: {
    backgroundColor: '#2BAE66FF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnTextEntrar: {
    color: '#fff',
    fontSize: 20,
  },
  btnCadastro: {
    marginTop: 15,
  },
  btnTextCadastro: {
    color: '#0063B2FF',
    fontSize: 18,
  },
})
