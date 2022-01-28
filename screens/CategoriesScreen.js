import { Button, StyleSheet, Text, View } from 'react-native'

export function CategoriesScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen</Text>
      <Button title='Go to Meals' onPress={() => {
        props.navigation.navigate('CategoryMeals')
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