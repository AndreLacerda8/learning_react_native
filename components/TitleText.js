import { StyleSheet, Text } from 'react-native'

export function TitleText(props){
  return(
    <Text style={{...props.style, ...styles.title}}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold'
  }
})