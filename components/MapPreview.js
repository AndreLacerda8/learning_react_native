import { API_KEY } from '@env'
import { Image, StyleSheet, View } from 'react-native'

export function MapPreview(props){
  let imagePreviewUrl

  if(props.location){
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${props.location.lat},${props.location.lng}&key=${API_KEY}`
  }

  return (
    <View style={{...styles.mapPreview, ...props.style}}>
      {props.location ? (
          <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
        ) : props.children
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  mapImage: {
    width: '100%',
    height: '100%'
  }
})