import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'

export function ProductsOverviewScreen(props){
  const products = useSelector(state => state.products.availableProducts)

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => <Text>{itemData.item.title}</Text>}
    />
  )
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}