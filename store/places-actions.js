import * as FileSystem from 'expo-file-system'
import { fetchPlaces, insertPlace } from '../helpers/db'
import { API_KEY } from '@env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export function addPlace(title, image, location){
  return async dispatch => {
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`)

    // if(!response.ok){
    //   throw new Error('Something went wrong')
    // }

    // const resData = await response.json()
    // if(!resData.results){
    //   throw new Error('Something went wrong')
    // }

    // const address = resData.results[0].formatted_address
    const address = '277 Bedford Avenue, Brooklyn, NY 11211, USA'
    
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng)
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      })
    } catch(err){
      console.log(err)
      throw err
    }
  }
}

export function loadPlaces(){
  return async dispatch => {
    try{
      const dbResult = await fetchPlaces()
      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array
      })
    } catch(err){
      throw err
    }
  }
}