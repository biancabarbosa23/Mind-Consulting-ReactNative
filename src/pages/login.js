import React, { useEffect, UseState } from 'react'
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
import api from '../services/api'
import {useNavigation} from '@react-navigation/native'

function Login({navigation}) {
  const [usuario, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(function () {
    ;(async function () {
      const token = await AsyncStorage.getItem('@CodeApi:token')
      const user = Json.parse(await AsyncStorage.getItem('@CodeApi:user'))
    })()
  })

  async function signIn(){
  try{
    const response = await api.post('/auth/login',{
      usuario:usuario,
      password:password,
    })
    const {token, userData} =response.data
    await AsyncStorage.multiGet([
      ['@CodeApi', token],
      ['@CodeApi:user', JSON.stringify(userData)],
    ])
    if(userData.level === 999){
      navigation.navigate('Adm')
    }else if(usuario.level === 1){
      navigation.navigate('Home')
    }else{
      Alert.alert('Usuário desativado!')
    }
  }catch(err){
    Alert.alert('Erro')
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
          autoCorrect="false"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          autoCorrect="false"
          secureTextEntry="true"
          style={styles.input}
        />

        <TouchableOpacity style={styles.btnEntrar}>
          <Text style={styles.btnTextEntrar}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCadastro}>
          <Text style={styles.btnTextCadastro}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
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

export default Login
