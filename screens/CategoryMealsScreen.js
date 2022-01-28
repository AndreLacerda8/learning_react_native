import { StyleSheet, Text, View } from 'react-native'

export function CategoryMealsScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Category Meals Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})