import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/colors'

export function NumberContainer(props){
  return(
    <View style={styles.conatiner}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  number: {
    color: Colors.accent,
    fontSize: 22
  }
})