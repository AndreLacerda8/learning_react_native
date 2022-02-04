import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL_SIGNUP, URL_SIGNIN } from '@env'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export function authenticate(userId, token, expiryTime){
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId, token })
  }
}

export function signup(email, password){
  return async dispatch => {
    const response = await fetch(URL_SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })

    if(!response.ok){
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if(errorId === 'EMAIL_EXISTS'){
        message = 'Email already exists'
      }
      throw new Error(message)
    }

    const responseData = await response.json()
    dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000))
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export function login(email, password){
  return async dispatch => {
    const response = await fetch(URL_SIGNIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    })

    if(!response.ok){
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong!'
      if(errorId === 'EMAIL_NOT_FOUND'){
        message = 'Email not found'
      } else if(errorId === 'INVALID_PASSWORD'){
        message = 'Invalid Password'
      }
      throw new Error(message)
    }

    const responseData = await response.json()
    dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000))
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export function logout(){
  clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

function clearLogoutTimer(){
  if(timer){
    clearTimeout(timer)
  }
}

function setLogoutTimer(expirationTime){
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

function saveDataToStorage(token, userId, expirationDate){
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expiryDate: expirationDate.toISOString()
  }))
}