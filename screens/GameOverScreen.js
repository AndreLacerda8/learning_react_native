import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { BodyText } from '../components/BodyText'
import { TitleText } from '../components/TitleText'

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
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was: {props.userNumber}</BodyText>
      <Button title='NEW GAME' onPress={props.onRestart} />
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
  }
})