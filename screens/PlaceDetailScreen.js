import { StyleSheet, Text, View } from 'react-native'

export function PlaceDetailScreen(){
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  }
}

const styles = StyleSheet.create({

})