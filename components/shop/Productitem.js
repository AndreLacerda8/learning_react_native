import { Button, Image, StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import Colors from '../../constants/Colors'

export function ProductItem(props){
  let TouchableComponent = TouchableOpacity

  if(Platform.OS === 'android' && Platform.Version >= 21){
    TouchableComponent = TouchableNativeFeedback
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button color={Colors.primary} title='View Details' onPress={props.onViewDetail} />
              <Button color={Colors.primary} title='To Cart' onPress={props.onAddToCart} />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden'
  },

  touchable: {
    overflow: 'hidden',
    borderRadius: 10
  },

  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: '100%'
  },

  details: {
    alignItems: 'center',
    height: '18%',
    padding: 10
  },

  title: {
    fontSize: 18,
    marginVertical: 4
  },

  price: {
    fontSize: 14,
    color: '#888'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '22%',
    paddingHorizontal: 20
  }
})