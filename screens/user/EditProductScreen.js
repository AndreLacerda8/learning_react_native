import { useCallback, useEffect, useReducer } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import { CustomHeaderButton } from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
  if(action.type === FORM_INPUT_UPDATE){

  }
}

export function EditProductScreen(props){
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  })

  const dispatch = useDispatch()

  const submitHandler = useCallback(() => {
    if(!titleIsValid){
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'OK' }
      ])
      return
    }
    if(editedProduct){
      dispatch(productsActions.updateProduct(prodId, title, description, imageUrl))
    } else {
      dispatch(productsActions.createProduct(title, description, imageUrl, +price))
    }
    props.navigation.goBack()
  }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid])

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  function titleChangeHandler(text){
    let isValid = false
    if(text.trim().length > 0){
      isValid = true
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: 'title'
    })
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },

  formControl: {
    width: '100%'
  },

  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})