import { StyleSheet, Text } from 'react-native'

export function BodyText(props){
  return(
    <Text style={{...props.style, ...styles.body}}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
})