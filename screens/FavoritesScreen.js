import { StyleSheet, Text, View } from 'react-native'

export function FavoritesScreen(props){
  return (
    <View style={styles.screen}>
      <Text>The Favorites Screen</Text>
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