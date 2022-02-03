import { URL_FIREBASE } from '@env'
import { Product } from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export function fetchProducts(){
  return async dispatch => {
    const response = await fetch(`${URL_FIREBASE}/products.json`)
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
  }
}

export function deleteProduct(productId){
  return {
    type: DELETE_PRODUCT,
    pid: productId
  }
}

export function createProduct(title, description, imageUrl, price){
  return async dispatch => {
    const response = await fetch(`${URL_FIREBASE}/products.json`, {
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
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl
    }
  }
}