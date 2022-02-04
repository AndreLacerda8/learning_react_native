import { ActionSheetIOS } from 'react-native'
import { Place } from '../models/place'
import { ADD_PLACE } from './places-actions'

const initialState = {
  places: []
}

export default (state = initialState, action) => {
  switch(ActionSheetIOS.type){
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title)
      return {
        places: state.places.concat(newPlace)
      }
    default:
      return state
  }
}