import { FlatList, View } from 'react-native'
import { MealList } from '../components/MealList'
import { CATEGORIES, MEALS } from '../data/dummy-data'

export function CategoryMealsScreen(props){
  const categoryId = props.navigation.getParam('categoryId')

  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
  )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(category => category.id === categoryId)

  return {
    headerTitle: selectedCategory.title
  }
}