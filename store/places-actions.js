export const ADD_PLACE = 'ADD_PLACE'

export function addPlace(title){
  return { type: ADD_PLACE, placeData: { title } }
}