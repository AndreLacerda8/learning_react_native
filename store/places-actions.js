export const ADD_PLACE = 'ADD_PLACE'

export function addPlace(title, image){
  return {
    type: ADD_PLACE,
    placeData: {
      title,
      image
    }
  }
}