import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


async function token(){
  let token = await AsyncStorage.getItem('fcmtoken')
  if(!token){
    try {
      let fcmtoken = await messaging().getToken()
            if(fcmtoken){
              await AsyncStorage.setItem('fcmtoken',fcmtoken)
            }
          } catch (error) {
            console.log("error",error)
        }
     }
}

export const NotificationTab= ()=>{
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
      );
    });
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
          );
        }
      });
      messaging().onMessage(async remoteMessage=>{
        Alert.alert('Hey!', JSON.stringify(remoteMessage.notification.body));
      })
    }
    export async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        // console.log('Authorization status:', authStatus);
        token()
      }
    }