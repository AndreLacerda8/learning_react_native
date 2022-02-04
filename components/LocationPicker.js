import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { MapPreview } from './MapPreview'

export function LocationPicker(props){
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState()
  async function verifyPermissions(){
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if(result.status !== 'granted'){
      Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app', [{ text: 'OK' }])
      return false
    }
    return true
  }

  async function getLocationHandler(){
    const hasPermission = await verifyPermissions()
    if(!hasPermission){
      return
    }
    try{
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 })
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    } catch(err){
      Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map', [{ text: 'OK' }])
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button title='Get User Location' color={Colors.primary} onPress={getLocationHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },

  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  }
})