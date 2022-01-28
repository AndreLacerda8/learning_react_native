import { Button, StyleSheet, Text, View } from 'react-native'

export function CategoryMealsScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Category Meals Screen</Text>
      <Button title='Go to Details' onPress={() => {
        props.navigation.navigate({
          routeName: 'MealDetail'
        })
      }} />
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