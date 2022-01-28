import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Header } from './components/Header'
import { GameOverScreen } from './screens/GameOverScreen'
import { GameScreen } from './screens/GameScreen'
import { StartGameScreen } from './screens/StartGameScreen'

function fetchFonts(){
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={err => console.log(err)}
    />
  }

  function configureNewGameHandler(){
    setGuessRounds(0)
    setUserNumber(null)
  }

  function startGameHandler(selectedNumber){
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  function gameOverHandler(numberOfRounds){
    setGuessRounds(numberOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if(guessRounds > 0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
  }
  
  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
