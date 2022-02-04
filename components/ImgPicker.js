import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

export function ImgPicker(props){
  async function verifyPermissions(){
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
    if(result.status !== 'granted'){
      Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app', [{ text: 'OK' }])
      return false
    }
    return true
  }

  async function takeImageHandler(){
    const hasPermission = await verifyPermissions()
    if(!hasPermission){
      return
    }
    ImagePicker.launchCameraAsync()
  }

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },

  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },

  image: {
    width: '100%',
    height: '100%'
  }
})