import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

function UserAlter() {
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)

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
          source={require('../../../assets/ImageUserExample.jpg')}
        />
      </View>
      <View style={styles.divInfo}>
        <View style={styles.textInfo}>
          <Text>Nome: </Text>
          <Text>CPF: </Text>
          <Text>E-mail: </Text>
          <Text>Senha: </Text>
        </View>
        <View style={styles.infoUser}>
          <TextInput
            value="Bianca Alves Barbosa"
            autoCorrect="false"
            editable={edit}
            style={styles.input}
          />
          <TextInput
            value="12312312345"
            autoCorrect="false"
            editable={edit}
            style={styles.input}
          />
          <TextInput
            value="bianca@hotmail.com"
            autoCorrect="false"
            editable={edit}
            style={styles.input}
          />
          <TextInput
            value="12345"
            autoCorrect="false"
            editable={edit}
            secureTextEntry="true"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.divButton}>
        {show ? (
          <TouchableOpacity
            style={styles.btnSalvar}
            onPress={() => {
              setEdit(false), setShow(false)
            }}
          >
            <Text style={styles.btnText}>Salvar Alterações</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
        <TouchableOpacity style={styles.btnVoltar}>
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
    height: 110,
    width: '100%',
  },
  header: {
    flex: 1,
    width: '90%',
    maxHeight: 140,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  imageUser: {
    flex: 1,
    alignSelf: 'center',
    borderStyle: 'solid',
    borderWidth: 3,
    maxWidth: 110,
    maxHeight: 110,
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
    maxHeight: 230,
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
    maxHeight: 150,
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

export default UserAlter
