
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,Alert,
  TextInput,
  Button
} from 'react-native';
import axios  from 'axios';
import DeviceInfo from 'react-native-device-info';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import GetLocation from 'react-native-get-location'
import { NetworkInfo } from "react-native-network-info";
import BackgroundService from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import {NotificationTab,requestUserPermission} from './src/utils/pushnotification'
import {host} from './config';
import messaging from '@react-native-firebase/messaging';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
 
var x;
var loc = {latitude: 24.9582895, longitude: 67.0691044}

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const veryIntensiveTask = async (taskDataArguments) => {
  const { delay } = taskDataArguments;
  return await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      // Linking.addEventListener('url', (handleOpenURL)=>{console.log('called')})
      try {
        const res = GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
        })
        .then(location => {
          loc = location
        })
        .catch(error => {
          const { code, message } = error;
        })
        let value = ({
          latitude:loc?.latitude,
          longitude:loc?.longitude,
        })
        console.log(value)
        await AsyncStorage.setItem('latitude',loc.latitude.toString())
        await AsyncStorage.setItem('longitude',loc.longitude.toString())
        let token = await AsyncStorage.getItem('fcmtoken')
        await axios.post(`https://tracking-sigma.vercel.app/location`, {
            [token]: {'latitude':loc?.latitude,'longitude':loc?.longitude}
        })
      } catch (err) {
        console.log(err)
      }
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Background',
  taskTitle: 'Location Tracking Start',
  taskDesc: 'Stay Safe in Covid',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', 
  parameters: {
    delay: 5000,
  },
};


const App = () => {
  const [dest,setDest] = useState({latitude: 21, longitude: 67})
  const [track,setTrack] = useState(true)
  const [lat,setLet] = useState(null)
  const [lng,setLng] = useState(null)
  const startBackgroundService = async () => {
    axios.get('https://tracking-sigma.vercel.app/getDestination').then(async x=>{
      console.log("x",x.data)
    if(x.data?.longitude && x.data?.latitude)
    {
      setDest(x.data)
      setTrack(false)
      await BackgroundService.start(veryIntensiveTask, options);

    }else{
      Alert.alert("Set New Destination Coordinate")
    }
    }).catch(x)
  }
  const stopBackgroundService = async (pop=null) => {
    if(pop){
      Alert.alert('Hey!', pop);
    }
    setTrack(true)
    await BackgroundService.stop();

  }
  useEffect(() => {
    requestUserPermission()
    NotificationTab(stopBackgroundService)
    axios.get('https://tracking-sigma.vercel.app/clear').then(x).catch(x)
    axios.get('https://tracking-sigma.vercel.app/getDestination').then(x=>{
    if(x.data?.longitude && x.data?.latitude)
    {
      setDest(x.data)

    }else{
      Alert.alert("Set New Destination Coordinate")
    }
    }).catch(x)
    

  }, [])
  const changeLocoation = ()=>{
    console.log(lat,lng)
    if(Number(lat) && Number(lng)){
      let data = {latitude: lat, longitude: lng}
      axios.post('https://tracking-sigma.vercel.app/changeDestination',data).then(x=>{Alert.alert("Destination Successfully Changed")}).catch(x)
    }
    else{
      Alert.alert("Invalid Format!")
    }
  }

  return (
    <>
      <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
        ><Marker coordinate = {{latitude: dest.latitude ,longitude:dest.longitude}} pinColor = {"purple"} /></MapView>
        <View style={{display : 'flex',flexDirection : 'row'}}>
          <TextInput
            placeholder="Latitude"
            keyboardType="numeric"
            style={{borderRadius: 10,height: 40,margin : 5,width : '35%', borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text)=>{
              setLet(text.replace(/[- #*;,<>\{\}\[\]\\\/]/gi,''))
            }}
            value={lat} 
            />
          <TextInput
            placeholder="Longitude"
            keyboardType="numeric"
            style={{borderRadius: 10,height: 40, margin : 5,width : '35%',borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text)=>{
              setLng(text.replace(/[- #*;,<>\{\}\[\]\\\/]/gi,''))
            }}
            value={lng} 
            />
            <TouchableOpacity disabled={!track} style={track?{borderRadius: 20,height: 40, margin : 5,marginLeft: 20,justifyContent: 'center',alignItems: 'center',width : 40,borderColor: 'yellow', borderWidth: 1,backgroundColor : 'grey'}:
            {borderRadius: 20,height: 40, margin : 5,marginLeft: 20,justifyContent: 'center',alignItems: 'center',width : 40,borderColor: 'white', borderWidth: 1,backgroundColor : 'grey',opacity: 0.5}} onPress={()=>{changeLocoation()}}><Text>+</Text></TouchableOpacity>
        </View>
        <SafeAreaView style={{justifyContent: 'center',width: '95%',margin: 'auto'}}>
          <TouchableOpacity disabled={!track} style={track?{ padding: 5,borderRadius: 10,borderWidth: 1, margin: 5,marginLeft : '35%',alignItems: 'center',borderColor: 'yellow',width : '30%'}:{ padding: 5,borderRadius: 10,borderWidth: 1, margin: 5,alignItems: 'center',marginLeft : '35%',borderColor: 'grey',width : '30%',opacity : 0.5}} onPress={() => startBackgroundService()}><Text>Start Tracking</Text></TouchableOpacity>
          <TouchableOpacity disabled={track} style={track?{ padding: 5,borderRadius: 10,borderWidth: 1, margin: 5,marginLeft : '35%',alignItems: 'center',borderColor: 'grey',width : '30%',opacity : 0.5}:{ padding: 5,borderRadius: 10,borderWidth: 1, margin: 5,alignItems: 'center',marginLeft : '35%',borderColor: 'yellow',width : '30%'}} onPress={() => stopBackgroundService()}><Text>Stop Tracking</Text></TouchableOpacity>
        </SafeAreaView>
    </>

  );
};

const styles = StyleSheet.create({

});

export default App;
