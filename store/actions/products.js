import { URL_FIREBASE } from '@env'
import { Product } from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export function fetchProducts(){
  return async dispatch => {
    try{
      const response = await fetch(`${URL_FIREBASE}/products.json`)
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()
      const loadedProducts = []
      for(const key in responseData){
        loadedProducts.push(new Product(
          key,
          'u1',
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        ))
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts })
    } catch(err){
      throw err
    }
  }
}

export function deleteProduct(productId){
  return async (dispatch, getState)=> {
    const token = getState().auth.token
    const response = await fetch(`${URL_FIREBASE}/products/${productId}.json?auth=${token}`, {
      method: 'DELETE'
    })

    if(!response.ok){
      throw new Error('Something went wrong!')
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    })
  }
}

export function createProduct(title, description, imageUrl, price){
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`${URL_FIREBASE}/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    })

    const responseData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price
      }
    })
  }
}

export function updateProduct(id, title, description, imageUrl){
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`${URL_FIREBASE}/products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    })

    if(!response.ok){
      throw new Error('Something went wrong!')
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    })
  }
}