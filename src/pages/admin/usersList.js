import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import api from '../../services/api'

export default function Ativar() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    ;(async () => {
      const lista = JSON.parse(await AsyncStorage.getItem('@CodeApi:listar'))
      setPeople(lista)
    })()
  })

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={[
          styles.text,
          item.level == 0 ? styles.btnListDesat : styles.btnLista,
        ]}
      >
        <View style={styles.containerProfile}>
          <Image
            style={styles.logo}
            source={require('../../../assets/ImageUserExample.jpg')}
          />
          <View style={styles.textProfile}>
            <Text style={styles.btnTitulo}>{item.name}</Text>
            <Text style={styles.btnText}>CPF: {item.cpf}</Text>
            <Text style={styles.btnEmail}>Email: {item.email}</Text>
            <Text style={styles.btnText}>Nivel de acesso: {item.level}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerListagem}>
        <Text style={styles.btnTitle}>Listagem De Todos os usuários</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.cpf}
          data={people}
          style={{ marginTop: 30 }}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
      </View>
      <StatusBar style="light" backgroundColor="black" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F95F62',
  },
  containerListagem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#343F4B',
  },
  container: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F95F62',
  },
  btnLista: {
    backgroundColor: '#343F4B',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnListDesat: {
    backgroundColor: '#111111',
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  logo: {
    marginLeft: 10,
    justifyContent: 'flex-start',
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  btnText: {
    color: '#fff',
    fontSize: 13,
  },
  textProfile: {
    margin: 20,
    flex: 1,
    flexDirection: 'column',
  },
  containerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
  },
  btnTitulo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  btnEmail: {
    color: '#fff',
    fontSize: 11,
  },
  btnTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})
