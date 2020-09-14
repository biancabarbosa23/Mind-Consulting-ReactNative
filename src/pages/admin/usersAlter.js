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
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import api from '../../services/api'

import { AntDesign } from '@expo/vector-icons'


function UsersAlter({ navigation }) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [level, setLevel] = useState('')
  const [cpfField, setCpfField] = useState('')
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:editUser'))
      setId(user._id)
      setName(user.name)
      setCpf(user.cpf)
      setEmail(user.email)
      setPassword(user.password)
      setLevel(user.level)
    })()
  }, [])

  async function atualizar() {
    try {

      if (cpfField.isValid()) {
        if (password === '') {
          await api.put('/application/' + id, {
            name,
            "cpf": cpfField.getRawValue(),
            email,
            level,
          })

        } else {
          await api.put('/application/' + id, {
            name,
            "cpf": cpfField.getRawValue(),
            email,
            level,
            password,
          })
        }

        //const response = await api.get('/application/usuarios')
        //await AsyncStorage.setItem('@CodeApi:users', JSON.stringify(response.data.users))

        Alert.alert('Alterado com sucesso! ')
        setEdit(false)
        setShow(false)
      } else {
        Alert.alert('CPF invalido!')
      }

    } catch (err) {
      Alert.alert('Não foi possível atualizar')
    }
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.divLogo}>
        <Image
          style={styles.logo}
          source={require('../../../assets/Mind-Branco.png')}
        />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setEdit(true), setShow(true)
          }}
        >
          <AntDesign name="edit" size={25} color="black" />
          <Text>Editar</Text>
        </TouchableOpacity>
        <Image
          style={styles.imageUser}
          source={require('../../../assets/ImageAdminExample.jpg')}
        />
      </View>
      <View style={styles.divInfo}>
        <View style={styles.textInfo}>
          <Text>Nome: </Text>
          <Text>CPF: </Text>
          <Text>E-mail: </Text>
          <Text>Nível: </Text>
          <Text>Senha: </Text>
        </View>
        <View style={styles.infoUser}>
          <TextInput
            editable={edit}
            style={styles.input}
            onChangeText={(value) => setName(value)}
          >{name}</TextInput>
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
            editable={edit}
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          >{email}</TextInput>
          <TextInput
            editable={edit}
            style={styles.input}
            onChangeText={(value) => setLevel(value)}
          >{level}</TextInput>
          <TextInput
            editable={edit}
            secureTextEntry="true"
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          >{password}</TextInput>
        </View>
      </View>
      <View style={styles.divButton}>
        {show ? (
          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={atualizar}
          >
            <Text style={styles.btnText}>Salvar Alterações</Text>
          </TouchableOpacity>
        ) : (false)}
        <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate('listar')}>
          <Text style={styles.btnText}>Voltar</Text>
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
    height: 80,
    width: '100%',
  },
  header: {
    flex: 1,
    width: '90%',
    maxHeight: 135,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  imageUser: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 3,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 100,
  },
  icon: {
    flex: 1,
    maxHeight: 25,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  divInfo: {
    flex: 1,
    width: '90%',
    maxHeight: 260,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  textInfo: {
    flex: 1,
    maxWidth: '15%',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  infoUser: {
    flex: 1,
    justifyContent: 'space-around',
  },
  input: {
    padding: 13,
    backgroundColor: '#dddd',
    borderRadius: 7,
    width: '100%',
    padding: 15,
    fontSize: 15,
  },
  divButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    maxHeight: 140,
    marginTop: 20,
  },
  btnVoltar: {
    marginTop: 15,
    backgroundColor: '#FF0000',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnSalvar: {
    marginTop: 15,
    backgroundColor: '#2BAE66FF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
})

export default UsersAlter
