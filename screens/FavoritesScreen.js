import { StyleSheet, Text, View } from 'react-native'

import { MealList } from '../components/MealList'
import { MEALS } from '../data/dummy-data'

export function FavoritesScreen(props){
  const favoriteMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')
  return (
    <MealList listData={favoriteMeals} navigation={props.navigation} />
  )
}

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites'
}