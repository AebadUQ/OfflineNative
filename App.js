
import React,{useState,useEffect} from 'react';
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
import VIForegroundService from '@voximplant/react-native-foreground-service';

// import GetLocation from 'react-native-get-location'
import { NetworkInfo } from "react-native-network-info";


const App= () => {
useEffect(()=>{
createChannel()
},[])
const createChannel=async()=>{
  const channelConfig = {
    id: 'channelId',
    name: 'Channel name',
    description: 'Channel description',
    enableVibration: false
};
await VIForegroundService.getInstance().createNotificationChannel(channelConfig);
}
const startForegroundService=async()=> {
  const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Title',
      text: 'Some text',
      icon: 'ic_icon',
      button: 'Some text',
  };
  try {
      await VIForegroundService.getInstance().startService(notificationConfig);
  } catch (e) {
      console.error(e);
  }
}
const stopForegroundService=async()=>{
  await VIForegroundService.getInstance().stopService();

}
  // const [loc,setLoc]=useState('')
  // const [ip,setIp]=useState()
  // const [devname,setDevname]=useState('')
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
 
//     var date = new Date().getDate();


//     var month = new Date().getMonth() + 1;

//     var year = new Date().getFullYear();

//     var hours = new Date().getHours();

//     var min = new Date().getMinutes();

//     var sec = new Date().getSeconds();

//     var finalObject = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

//  console.log(finalObject)
// DeviceInfo.getDeviceName().then((deviceName) => {
//   setDevname(deviceName)
//   console.log(deviceName)
// });



// const handle=()=>{
//   // console.log(lo)
//   const res=GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 15000,
//   })
//   .then(location => {
//     // console.log(location);
//     setLoc(location)
//   })
//   .catch(error => {
//     const { code, message } = error;
//     // console.warn(code, message);
//   })
//   console.log(loc?.latitude)
//   axios.post("https://test-rdgw45gi2q-oa.a.run.app/add_data", {
//     password:"sirsaulat",
//     data:{
//       name:devname,
//       location:{
//         latitude:loc?.latitude,
//         longitude:loc?.longitude
//       },
//       ip_address:ip,
//       timestamp:finalObject
//     }
//   })
//   .then((response) => {
//     console.log(response);
//   });
//   console.log(devname)
// }
  return (
    <SafeAreaView>
      <TouchableOpacity style={{borderWidth:1,margin:10,height:30}} onPress={()=>startForegroundService()}></TouchableOpacity>
      <TouchableOpacity style={{borderWidth:1,margin:10}} onPress={()=>stopForegroundService()}><Text>2</Text></TouchableOpacity>

      <TouchableOpacity style={{borderWidth:1,margin:10}}><Text>3</Text></TouchableOpacity>

      <TouchableOpacity style={{borderWidth:1,margin:10}}><Text>4</Text></TouchableOpacity>

        {/* <TouchableOpacity onPress={handle}><Text>Click</Text></TouchableOpacity> */}
        <TouchableOpacity><Text>sadsa</Text></TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
