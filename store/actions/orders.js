import { URL_FIREBASE } from '@env'
import { Order } from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export function fetchOrders(){
  return async (dispatch, getState) => {
    const userId = getState().auth.userId
    try{
      const response = await fetch(`${URL_FIREBASE}/orders/${userId}.json`)
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()
      const loadedOrders = []
      for(const key in responseData){
        loadedOrders.push(new Order(
          key,
          responseData[key].cartItems,
          responseData[key].totalAmount,
          new Date(responseData[key].date)
        ))
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
      })
    } catch(err){
      throw err
    }
  }
}

export function addOrder(cartItems, totalAmount){
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    const date = new Date()
    const response = await fetch(`${URL_FIREBASE}/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    })

    if(!response.ok){
      throw new Error('Something went wrong!')
    }

    const responseData = await response.json()

    dispatch({
      type: ADD_ORDER,
      orderData: { id: responseData.name, items: cartItems, amount: totalAmount, date }
    })
  }
}