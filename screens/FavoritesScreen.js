import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { CustomHeaderButton } from '../components/HeaderButton'
import { MealList } from '../components/MealList'
import { useSelector } from 'react-redux'

export function FavoritesScreen(props){
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

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