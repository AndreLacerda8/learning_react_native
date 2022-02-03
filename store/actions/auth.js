import { URL_SIGNUP } from '@env'

export const SIGNUP = 'SIGNUP'

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