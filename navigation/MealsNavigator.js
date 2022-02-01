import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Colors from '../constants/Colors'
import { CategoriesScreen } from '../screens/CategoriesScreen'
import { CategoryMealsScreen } from '../screens/CategoryMealsScreen'
import { MealDetailScreen } from '../screens/MealDetailScreen'
import { FavoritesScreen } from '../screens/FavoritesScreen'
import { FiltersScreen } from '../screens/FiltersScreen'
import { Platform, Text } from 'react-native'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white'
}

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: {
    screen: CategoryMealsScreen
  },
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={22} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={22} color={tabInfo.tintColor} />
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
    }
  }
}

const MealsFavTabNavigator =
  Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true
  })
  : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
      labelStyle: {
        fontFamily: 'open-sans'
      },
      activeTintColor: Colors.accentColor
    }
  })

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
  MealsFavs: { 
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans'
    }
  }
})

export default createAppContainer(MainNavigator)