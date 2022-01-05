import React,{useEffect, useRef,useState} from 'react';
import { View ,Text,ImageBackground,ScrollView,StyleSheet,Dimensions,Image,TouchableOpacity, Animated} from 'react-native';
import InputField from '../../components/InputField';
import MailIcon from "react-native-vector-icons/Fontisto";
import PassIcon from "react-native-vector-icons/Feather";
import ValidateEmail from "../../utils/emailValidation"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as actions from "../../store/action"
import Btn from "../../components/btn"
import { connect } from 'react-redux';
import {useTheme} from "@react-navigation/native"
GoogleSignin.configure();
const {height,width}=Dimensions.get('screen')

function Login({login,navigation,user}){
    const {colors}=useTheme()
    const scale=useRef(new Animated.Value(0)).current
    const [fields,setFields]=useState({
        email:"",
        password:""
    })
    const [submit,setSubmit]=useState();
    const [loader,setLoader]=useState(false)

    useEffect(()=>{
        Animated.timing(scale,{
            toValue:1,
            duration:700,
            useNativeDriver:true
        }).start()
    },[])

    function getValue(k,v){
        setFields((pS)=>{
            return{
                ...pS,
                [k]:v
            }
        })
    }

    function renderLoader(con){
        if(con){
            setLoader(true)
        }else{
            setLoader(false)
        }
    }

    function onLogin(){
        setSubmit(true)
        if(fields.password && fields.email){
            renderLoader(true)
            login(fields).then(()=>renderLoader(false)).catch((err)=>{
                renderLoader(false)
                alert(err)
            })
        }
    }

    const googleLogin = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const {id,name,email}=userInfo.user
          login({
              first_name:name,
              email,
              social_login:1
          })
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    return(
                <ImageBackground style={{flex:1}} source={require('../../../assets/login.png')}>
                    <Animated.ScrollView 
                style={{flex:1,transform:[{scale}] }}>
                    <View style={styles.con}>
                            <View style={{...styles.heading,marginBottom:20}}>
                                <Image
                                source={require('../../../assets/logo.png')}
                                />
                            </View>
                        <View style={{...styles.child,backgroundColor:colors.background}}>
                        <View style={{...styles.heading,width:'100%'}}>
                                <Text style={{color:colors.text,textAlign:'center',width:'100%',fontSize:20,fontWeight:'700',paddingVertical:responsiveFontSize(2)}}>LOGIN</Text>
                            </View>
                            <InputField
                                error={!fields.email &&  submit?true:null}
                                getValue={(v)=>getValue('email',v)}
                                icon={()=>{
                                    return(
                                        <MailIcon 
                                        name="email"
                                        color={colors.card}
                                        size={20}
                                        />
                                    )
                                }}
                                password={false}
                                placeHolder="Email or User name"
                                color="grey"
                                />
                            <InputField
                            error={!fields.password&& submit?true:null}
                            getValue={(v)=>getValue('password',v)}
                            icon={()=>{
                                return(
                                    <PassIcon 
                                    name="lock"
                                    color={colors.card}
                                    size={20}
                                    />
                                )
                            }}
                            password={true}
                            placeHolder="Password"
                            color="grey"
                            />
                            <TouchableOpacity 
                            onPress={()=>navigation.push('forgetPassword')}
                            style={{width:'100%',justifyContent:'center',alignItems:'flex-end'}}
                            >
                                <Text style={{fontSize:12,color:'grey',marginVertical:4}}>Forget Password</Text>
                            </TouchableOpacity>
                            <View>
                                {user.data.error?<Text style={{fontSize:12,color:'red',width:'100%',textAlign:'center'}}>{user.message}</Text>:null}
                            </View>
                            <View style={{marginVertical:responsiveFontSize(1)}}>
                            <Btn
                            text="Sign In"
                            loader={loader}
                            call={onLogin}
                            />
                            </View>
                            <View style={{marginVertical:responsiveFontSize(1)}}>
                            <Btn
                            text="Google"
                            call={googleLogin}
                            color="#c62f1c"
                            />
                            </View>
    
                        </View>
                        <View style={{width:'80%',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:colors.text,padding:responsiveFontSize(1)}}>Or</Text>
                            <View style={{width:'100%'}}>
                            <Btn
                            call={()=>navigation.push('signUp')}
                            text="SIGN UP"
                            color="grey"
                            />
                            </View>
                        </View>
                    </View>
                </Animated.ScrollView>
                </ImageBackground>
    )
}


const styles=StyleSheet.create({
    con:{
        marginTop:responsiveFontSize(7),
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    child:{
        width:'80%',
        borderRadius:20,
        padding:responsiveFontSize(3),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    heading:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps,actions)(Login);
