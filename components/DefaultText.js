import { StyleSheet, Text } from 'react-native'

export function DefaultText(props){
  return (
    <Text style={styles.text}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
})