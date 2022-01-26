import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { GoalInput } from './components/GoalInput'
import { GoalItem } from './components/GoalItem'

export default function App() {
  const [courseGoals, setCourseGoals, ] = useState([])

  function addGoalHandler(goalTitle){
    setCourseGoals(currentGoals => [{ key: Math.random().toString(), value: goalTitle }, ...currentGoals])
  }

  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={courseGoals}
        renderItem={itemData => <GoalItem title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
