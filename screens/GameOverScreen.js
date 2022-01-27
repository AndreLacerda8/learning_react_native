import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { BodyText } from '../components/BodyText'
import { MainButton } from '../components/MainButton'
import { TitleText } from '../components/TitleText'

import Colors from '../constants/colors'

export function GameOverScreen(props){
  return(
    <View style={styles.screen}>
      <TitleText>The Game is Over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          // source={require('../assets/success.png')}
          source={{ uri: 'https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=' }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  
  },

  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  },

  image: {
    width: '100%',
    height: '100%'
  },

  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },

  resultText: {
    textAlign: 'center',
    fontSize: 18
  },

  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
})