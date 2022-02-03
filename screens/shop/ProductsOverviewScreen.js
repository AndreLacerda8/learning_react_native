import { useCallback, useEffect, useState } from 'react'
import { Button, FlatList, Platform, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import { ProductItem } from '../../components/shop/Productitem'
import { CustomHeaderButton } from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'

export function ProductsOverviewScreen(props){
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const products = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try{
      await dispatch(productsActions.fetchProducts())
    } catch(err){
      setError(err.message)
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts) 

    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [dispatch, loadProducts])

  function selectItemHandler(id, title){
    props.navigation.navigate('ProductDetail',{
      productId: id,
      productTitle: title
    })
  }

  if(error){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
      </View>
    )
  }

  if(isLoading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if(!isLoading && products.length === 0){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem>
      )}
    />
  )
}

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  }
}