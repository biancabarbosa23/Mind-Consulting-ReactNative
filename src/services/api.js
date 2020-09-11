import axios from 'axios'
import { AsyncStorage } from 'react-native'

const api = axios.create({
  baseURL: 'http://192.168.0.11:5000',
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@CodeApi:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
