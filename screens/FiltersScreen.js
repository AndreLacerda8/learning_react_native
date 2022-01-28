import { StyleSheet, Text, View } from 'react-native'

export function FiltersScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen</Text>
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