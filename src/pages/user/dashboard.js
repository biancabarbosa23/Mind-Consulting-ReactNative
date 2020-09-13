import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  AsyncStorage
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

function UserDashboard({ navigation }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@CodeApi:token')
      const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'))
      setUser(user)
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
      <View style={styles.header}>
        <Image
          style={styles.imageUser}
          source={require('../../../assets/ImageUserExample.jpg')}
        />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.divButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('perfil')}>
          <Text style={styles.btnText}>Ver Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSair} onPress={() => navigation.navigate('login')}>
          <Text style={styles.btnText}>Sair</Text>
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
    maxHeight: 180,
    justifyContent: 'center',
    marginTop: 10,
  },
  imageUser: {
    flex: 1,
    alignSelf: 'center',
    borderWidth: 3,
    maxWidth: 110,
    maxHeight: 110,
    borderRadius: 100,
  },
  name: {
    marginTop: 15,
    alignSelf: 'center',
    fontSize: 20,
  },
  divButton: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    maxHeight: 150,
    marginTop: 20,
  },
  btnSair: {
    marginTop: 50,
    backgroundColor: '#FF0000',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  button: {
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

export default UserDashboard
