import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors'

export function CategoriesScreen(props){
  function renderGridItem(itemData){
    return (
      <TouchableOpacity style={styles.gridItem} onPress={() => {
        props.navigation.navigate({
          routeName: 'CategoryMeals'
        })
      }}>
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
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
  headerTitle: 'Meals Categories',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
})