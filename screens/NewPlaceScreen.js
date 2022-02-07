import { useCallback, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { ImgPicker } from '../components/ImgPicker'
import { LocationPicker } from '../components/LocationPicker'

import Colors from '../constants/Colors'
import * as placesActions from '../store/places-actions'

export function NewPlaceScreen(props){
  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  function titleChangeHandler(text){
    setTitleValue(text)
  }

  function imageTakeHandler(imagePath){
    setSelectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  function savePlaceHandler(){
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImgPicker onImageTake={imageTakeHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },

  label: {
    fontSize: 18,
    marginBottom: 15
  },

  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})