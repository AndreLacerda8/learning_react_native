import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export function GoalItem(props){
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => props.onDelete(props.id)}>
      <View style={styles.listItem} >
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
})