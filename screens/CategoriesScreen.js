import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CategoryGridTile } from '../components/CategoryGridTile'

import { CATEGORIES } from '../data/dummy-data'

export function CategoriesScreen(props){
  function renderGridItem(itemData){
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          })
        }}
      />
    )
  }

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  )
}

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meals Categories'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})