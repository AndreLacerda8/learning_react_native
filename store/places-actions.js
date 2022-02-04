import * as FileSystem from 'expo-file-system'
import { fetchPlaces, insertPlace } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export function addPlace(title, image){
  return async dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3)
      console.log(dbResult)
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath
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