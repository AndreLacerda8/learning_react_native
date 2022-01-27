import { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Card } from '../components/Card'
import { MainButton } from '../components/MainButton'
import { NumberContainer } from '../components/NumberContainer'
import { BodyText } from '../components/BodyText'

import DefaultStyles from '../constants/default-styles'

function generateRandomBetween(min, max, exclude){
  min = Math.ceil(min)
  max = Math.floor(max)
  const randomNumber = Math.floor(Math.random() * (max - min)) + min
  if(randomNumber === exclude){
    return generateRandomBetween(min, max, exclude)
  } else {
    return randomNumber
  }
}

function renderListItem(value, numOfRound){
  return(
    <View key={value} style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  )
}

export function GameScreen({ userChoice, onGameOver }){
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if(currentGuess === userChoice){
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, onGameOver, userChoice])

  function nextGuessHandler(direction){
    if((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)){
      Alert.alert('Dont\'t lie!', 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' }
      ])
      return
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    // setRounds(currentRounds => currentRounds + 1)
    setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses])
  }

  return(
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },

  listContainer: {
    flex: 1,
    width: '80%'
  },

  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  }
})