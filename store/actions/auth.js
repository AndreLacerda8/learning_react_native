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
      throw new Error('Something went wrong')
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
      throw new Error('Something went wrong')
    }

    const responseData = await response.json()
    console.log(responseData)

    dispatch({ type: LOGIN })
  }
}