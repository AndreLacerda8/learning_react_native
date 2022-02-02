import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Colors from '../constants/Colors'

import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen'
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen'
import { CartScreen } from '../screens/shop/CartScreen'

const ProductNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
})

export default createAppContainer(ProductNavigator)