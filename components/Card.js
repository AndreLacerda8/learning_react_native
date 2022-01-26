import { StyleSheet, View } from 'react-native'

export function Card(props){
  return(
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5, //isso aqui aplica no android o shadow que, tipo que tá acima, porque o shadow aplica só no ios
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
})