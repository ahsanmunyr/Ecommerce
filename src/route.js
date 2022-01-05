import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme,DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect} from 'react-redux';
import Login from "./screens/auth/login";
import signUp from './screens/auth/signUp';
import forgetPassword from './screens/auth/forgetPassword';
import HomeIcon from "react-native-vector-icons/FontAwesome5";
import NotiIcon from "react-native-vector-icons/Ionicons"
import ProductIcon from "react-native-vector-icons/Feather";
import BasketIcon from "react-native-vector-icons/Fontisto";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import HistoryIcon from "react-native-vector-icons/FontAwesome5";
import Home from "./screens/home/home";
import Product from './screens/products/product';
import Busket from './screens/busket/busket';
import Profile from './screens/profile/profile';
import Notification from './screens/notification/notification';
import * as actions from "./store/action";
import ProductDetail from './screens/home/productDetail';
import Search from "./screens/search/search"
import ProductList from './screens/products/productList';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './components/pageLoader';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import History from './screens/history/history';
import HistoryDetail from './screens/history/historyDetail';

const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card:'#f8af00',
    background:'white',
    text:'#000000'
  }
};
const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card:'#f8af00',
    background:'#404040',
    text:'#ffffff'
  }
};

function AuthRoutes(){
  return(
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen 
      options={{headerShown:false}}
      name="login" 
      component={Login}
      />
      <Stack.Screen 
      options={{headerShown:false}}
      name="signUp" 
      component={signUp}
      />
      <Stack.Screen 
      options={{headerShown:false}}
      name="forgetPassword" 
      component={forgetPassword}
      />
    </Stack.Navigator>
  )
}

function HomeRoutes(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerTintColor: '#fff'
    }}
    >
      <Stack.Screen
      name="home"
      options={{title:false}}
      component={Home}
      />
      <Stack.Screen
      name="search"
      component={Search}
      options={{
        headerBackTitleVisible:false
      }}
      />
      <Stack.Screen
      options={{
        title:"Product Detail",
        headerBackTitleVisible:false
      }}
      name="productDetail"
      component={ProductDetail}
      />
    </Stack.Navigator>
  )
}
function ProductRoutes(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerTintColor: '#fff'
    }}
    >
      <Stack.Screen
      name="product"
      options={{
        title:'CATEGORY'
      }}
      component={Product}
      />
      <Stack.Screen
      name="productList"
      component={ProductList}
      options={{
        headerBackTitleVisible:false
      }}
      />
      <Stack.Screen
      name="search"
      component={Search}
      options={{
        headerBackTitleVisible:false
      }}
      />
      <Stack.Screen
      options={{
        title:"Product Detail",
        headerBackTitleVisible:false
      }}
      name="productDetail"
      component={ProductDetail}
      />
    </Stack.Navigator>
  )
}
function ProfileRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="profile"
      component={Profile}
      />
    </Stack.Navigator>
  )
}
function BusketRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="busket"
      component={Busket}
      />
    </Stack.Navigator>
  )
}

function NotificationRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen
      name="notification"
      component={Notification}
      />
    </Stack.Navigator>
  )
}

function HistoryRoutes(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerTintColor: '#fff'
    }}>
      <Stack.Screen
      name="history"
      component={History}
      />
      <Stack.Screen
      name="historyDetail"
      options={{
        title:"Order Detail",
        headerBackTitleVisible:false
      }}
      component={HistoryDetail}
      />
    </Stack.Navigator>
  )
}

function Tabs(initialRoute){
  return (
      <Tab.Navigator
      tabBarOptions={{
        labelStyle:{
          marginBottom:2
        },
        activeTintColor:'white'
      }}
      initialRouteName={initialRoute}
      >

      <Tab.Screen 
      options={{
        title:"Home",
        tabBarIcon:({color})=><HomeIcon name="home" size={20} color={color}/>
      }}
      name="home" 
      component={HomeRoutes} />

      <Tab.Screen 
      options={{
        title:"Notification",
        tabBarIcon:({color})=><NotiIcon name="notifications" size={20} color={color}/>
      }}
      name="notification" 
      component={NotificationRoutes} />
      <Tab.Screen 
      options={{
        title:"Product",
        tabBarIcon:({focused,color})=><ProductIcon name="box" size={20} color={color}/>
      }}
      name="product" 

      component={ProductRoutes} />

      <Tab.Screen 
      options={{
        title:"Busket",
        tabBarIcon:({color})=><BasketIcon name="shopping-basket-add" size={20} color={color}/>
      }}
      name="busket" 
      component={BusketRoutes} />
      <Tab.Screen 
      options={{
        title:"profile",
        tabBarIcon:({color})=><ProfileIcon name="user-circle" size={20} color={color}/>
      }}
      name="profile" 
      component={ProfileRoutes} />
      <Tab.Screen 
      options={{
        title:"History",
        tabBarIcon:({color})=><HistoryIcon name="history" size={20} color={color}/>
      }}
      name="history" 
      component={HistoryRoutes} />
      </Tab.Navigator>
  );
}

function Routes({theme,user,setUserOnload}){
  const navigation=useRef(null)
  const [loading,setLoading]=useState(true)
  const [initialRoute, setInitialRoute] = useState('home');
  useEffect(()=>{
    getId()

    messaging()
      .subscribeToTopic('ecomerce')
      .then(() => console.log('Subscribed to topic!'));

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        if(navigation.current){
          navigation.current.navigate("notification")
        }
      });
  
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            setInitialRoute("notification"); // e.g. "Settings"
          }
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
          PushNotification.localNotification({
            channelId: "channel-id",
            channelName: "My channel",
            message:remoteMessage.notification.body,
            playSound:true,
            title:remoteMessage.notification.title,
            priority:'high',
            soundName:'default',
            
          })
        });
        return unsubscribe;
  },[])

 async function getId(){
    const id=await AsyncStorage.getItem('id');
    setLoading(false)
    id?setUserOnload(id):null
  }
  if(loading){
    return <Loader/>
  }else{
    return(
      <NavigationContainer 
      ref={navigation}
      theme={theme=="dark"?darkTheme:MyTheme}>
        {user.success?Tabs(initialRoute):AuthRoutes()}
      </NavigationContainer>
    )
  }
}

function mapStateToProps({theme,user}){
  return {theme,user}
}

export default connect(mapStateToProps,actions)(Routes);

