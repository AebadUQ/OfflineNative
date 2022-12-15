
import React,{useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import GetLocation from 'react-native-get-location'
import { NetworkInfo } from "react-native-network-info";


const App= () => {
  const [loc,setLoc]=useState('')
  const [ip,setIp]=useState()
  const [devname,setDevname]=useState('')
  // NetworkInfo.getIPAddress().then(ipAddress => {
  //   console.log(ipAddress);
  //   setIp(ipAddress)
  // });
  // NetworkInfo.getSSID().then(ssid => {
  //   console.log(ssid);
  // });
  // NetworkInfo.getIPV4Address().then(ipv4Address => {
  //   console.log(ipv4Address);
  // });
  // NetworkInfo.getIPV4Address().then(ipv4Address => {
  //   console.log(ipv4Address);
  // });
 
    var date = new Date().getDate();


    var month = new Date().getMonth() + 1;

    var year = new Date().getFullYear();

    var hours = new Date().getHours();

    var min = new Date().getMinutes();

    var sec = new Date().getSeconds();

    var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

 console.log(finalObject)
DeviceInfo.getDeviceName().then((deviceName) => {
  setDevname(deviceName)
  console.log(deviceName)
});



const handle=()=>{
  // console.log(lo)
  const res=GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
    // console.log(location);
    setLoc(location)
  })
  .catch(error => {
    const { code, message } = error;
    // console.warn(code, message);
  })
  console.log(loc?.latitude)
  axios.post("https://test-rdgw45gi2q-oa.a.run.app/add_data", {
    password:"sirsaulat",
    data:{
      name:devname,
      location:{
        latitude:loc?.latitude,
        longitude:loc?.longitude
      },
      ip_address:ip,
      timestamp:finalObject
    }
  })
  .then((response) => {
    console.log(response);
  });
  console.log(devname)
}
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={handle}><Text>Click</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
