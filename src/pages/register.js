import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native'

function Register() {
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
          placeholder="Nome"
          autoCorrect="false"
          style={styles.input}
        />

        <TextInput placeholder="CPF" autoCorrect="false" style={styles.input} />
        <TextInput
          placeholder="E-mail"
          autoCorrect="false"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          autoCorrect="false"
          secureTextEntry="true"
          style={styles.input}
        />

        <TouchableOpacity style={styles.btnCadastrar}>
          <Text style={styles.btnTextCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnVoltar}>
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

export default Register
