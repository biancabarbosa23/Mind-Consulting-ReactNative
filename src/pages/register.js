import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import api from '../services/api'

export default function Register({ navigation }) {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpfField, setCpfField] = useState('')


  async function cadastrar() {
    //enviando o formulário

    try {
      if (cpfField.isValid()) {
        const response = await api.post('/auth/cadastro', {
          name,
          "cpf": cpfField.getRawValue(),
          email,
          password,
          level: 1,
        })

        const { newUser, token } = response.data


        //salvando user e o token no AsyncStorage
        await AsyncStorage.multiSet([
          ['@CodeApi:token', token],
          ['@CodeApi:user', JSON.stringify(newUser)],
        ])

        Alert.alert('Cadastrado com sucesso ')

        navigation.navigate('usuario')
      } else {
        Alert.alert('Cpf invalido')
      }
    } catch (response) {
      Alert.alert('Não foi possível registrar')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.divLogo}>
        <Image onPress={ImagePickerCall}
          style={styles.logo}
          source={require('../../assets/Mind-Branco.png')}
        />
      </View>
      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={(value) => setName(value)}
        />

        <TextInputMask
          placeholder="CPF"
          type={'cpf'}
          value={cpf}
          style={styles.input}
          onChangeText={(text, ref = null) => {
            setCpf(text);
          }}
          ref={(ref) => {
            setCpfField(ref);
          }}
        />

        <TextInput
          placeholder="E-mail"
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry="true"
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
        />

        <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrar}>
          <Text style={styles.btnTextCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.btnTextVoltar}>Voltar a tela de Login</Text>
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
    height: 200,
    width: '100%',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
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
  btnCadastrar: {
    backgroundColor: '#2BAE66FF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnTextCadastrar: {
    color: '#fff',
    fontSize: 20,
  },
  btnVoltar: {
    marginTop: 15,
  },
  btnTextVoltar: {
    color: '#0063B2FF',
    fontSize: 18,
  },
})
