import { StyleSheet, Text, View } from 'react-native'

export function MealDetailScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Meal Detail Screen</Text>
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