import { URL_SIGNUP, URL_SIGNIN } from '@env'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

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
    console.log(responseData)

    dispatch({ type: SIGNUP })
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
    console.log(responseData)

    dispatch({ type: LOGIN })
  }
}