import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CustomHeaderButton } from '../components/HeaderButton'
import { MealList } from '../components/MealList'
import { MEALS } from '../data/dummy-data'

export function FavoritesScreen(props){
  const favoriteMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')
  return (
    <MealList listData={favoriteMeals} navigation={props.navigation} />
  )
}

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
          navData.navigation.toggleDrawer()
        }} />
      </HeaderButtons>
    )
  }
}