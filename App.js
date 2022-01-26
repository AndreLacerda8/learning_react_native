import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { GoalInput } from './components/GoalInput'
import { GoalItem } from './components/GoalItem'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  function addGoalHandler(goalTitle){
    if(goalTitle.trim() === ''){
      return
    }
    setCourseGoals(currentGoals => [{ id: Math.random().toString(), value: goalTitle }, ...currentGoals])
    setIsAddMode(false)
  }

  function removeGoalHandler(goalId){
    setCourseGoals(currentGoals => currentGoals.filter(goal => goal.id !== goalId))
  }

  function cancelGoalAdditionHandler(){
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
