import { useState } from 'react'
import { Button, TextInput, View, StyleSheet } from 'react-native'

export function GoalInput(props){
  const [enteredGoal, setEnteredGoal] = useState('')

  function goalInputHandler(enteredText){
    setEnteredGoal(enteredText)
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder='Course Goal'
        style={styles.input}
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      <Button title='ADD' onPress={() => props.onAddGoal(enteredGoal)} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: '80%'
  }
})