import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import UserDashboard from './src/pages/user/dashboard'
import AdminDashboard from './src/pages/admin/dashboard'
import UserAlter from './src/pages/admin/usersAlter'
import UsersList from './src/pages/admin/usersList'

export default function App() {
  return <UsersList></UsersList>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
