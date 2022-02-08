import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true
    }
  }
})

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(statusObj => {
      if(statusObj.status !== 'granted'){
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      return statusObj
    }).then(statusObj => {
      if(statusObj.status !== 'granted'){
        throw new Error('Permission not granted')
      }
    }).then(() => {
      return Notifications.getExpoPushTokenAsync()
    }).then(response => {
      const token = response.data
    }).catch(err => {
      console.log(err)
      return null
    })
  }, [])

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('RESPONSE: ', response)
    })

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })
    return () => {
      backgroundSubscription.remove()
      foregroundSubscription.remove()
    }
  }, [])

  function triggerNotificationHandler(){
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first notification we are sending',
    //     data: { myData: 'Some data' }
    //   },
    //   trigger: {
    //     seconds: 5
    //   }
    // })
  }

  return (
    <View style={styles.screen}>
      <Button title='Trigger Notification' onPress={triggerNotificationHandler} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})