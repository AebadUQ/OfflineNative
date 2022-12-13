
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import GetLocation from 'react-native-get-location'
import { NetworkInfo } from "react-native-network-info";


const App= () => {
  NetworkInfo.getIPAddress().then(ipAddress => {
    console.log(ipAddress);
  });
  NetworkInfo.getSSID().then(ssid => {
    console.log(ssid);
  });
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log(ipv4Address);
  });
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log(ipv4Address);
  });  
    var date = new Date().getDate();


    var month = new Date().getMonth() + 1;

    var year = new Date().getFullYear();

    var hours = new Date().getHours();

    var min = new Date().getMinutes();

    var sec = new Date().getSeconds();

    var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

 console.log(finalObject)
DeviceInfo.getDeviceName().then((deviceName) => {
  console.log(deviceName)
});
GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
.then(location => {
  console.log(location);
})
.catch(error => {
  const { code, message } = error;
  console.warn(code, message);
})


  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
