import axios from 'axios'
import { AsyncStorage } from 'react-native'

//Consumindo API do backend
const api = axios.create({
  baseURL: 'http://192.168.0.11:5000',
})

//Aquisição do Token
api.addAsyncRequestTransform((request) => async () => {
  const token = await AsyncStorage.getItem('@CodeApi:token')

  if (token) request.headers['Authorization'] = `Bearer ${token}`
})

api.addResponseTransform((response) => {
  if (!response.ok) throw response
})

export default api
