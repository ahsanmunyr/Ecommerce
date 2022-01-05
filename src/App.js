import React, { Component, useEffect } from 'react';
import { View, Text ,Alert} from 'react-native';
import { Provider} from "react-redux"
import store from "./store/index";
import Routes from "./route";
import GlobalFont from 'react-native-global-font'
import { NativeBaseProvider, Box } from 'native-base'
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen'

function App(){

  useEffect(()=>{
    GlobalFont.applyGlobal("Montserrat-Regular")
    SplashScreen.hide();
    requestUserPermission()
  },[])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      const token=await messaging().getToken()
      console.log(token)
    }
  }
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App
