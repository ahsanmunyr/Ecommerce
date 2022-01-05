import React,{useState,useEffect,useRef} from 'react';
import { View ,Text,TouchableOpacity,StyleSheet,Dimensions,Image,Animated} from 'react-native';
import InputField from '../../components/InputField';
import MailIcon from "react-native-vector-icons/Fontisto";
import BackIcon from "react-native-vector-icons/Ionicons";
import ResetPasswordIcon from "react-native-vector-icons/MaterialCommunityIcons"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import * as actions from "../../store/action"
import Btn from "../../components/btn"
import { connect } from 'react-redux';
import {useTheme} from "@react-navigation/native";
import SuccessModel from '../../components/succesModel';

const {height,width}=Dimensions.get('screen')

function ForgetPassword({login,navigation,forgetPassword}){
    const {colors}=useTheme()
    const [fields,setFields]=useState({
        email:""
    })
    
    const [submit,setSubmit]=useState();
    const [loader,setLoader]=useState(false)
    const [model,setModel]=useState(false)
    const [data,setData]=useState({})
    const translateY=useRef(new Animated.Value(600)).current
    useEffect(()=>{
        Animated.timing(translateY,{
            toValue:0,
            duration:1000,
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

    function onForgetPassword(){
        setSubmit(true)
        if(fields.email){
            renderLoader(true)
            forgetPassword(fields.email).then((res)=>{
                renderLoader(false)
                res.success?setModel(true):null
                setData(res)
            }).catch((err)=>{
                renderLoader(false)
                alert(err)
            })
        }
    }

    return(
                <View style={{flex:1,backgroundColor:colors.card}}>
                    {data.success?(
                        <SuccessModel
                        title={data.message}
                        visible={model}
                        closeModle={()=>setModel(false)}
                        />
                    ):null}
                    <View 
                    style={styles.con}>
                        <TouchableOpacity 
                        onPress={()=>navigation.goBack()}
                        style={{width:'100%',paddingTop:10,paddingLeft:15}}
                        >
                            <BackIcon
                            name="arrow-back"
                            color="white"
                            size={30}
                            />
                        </TouchableOpacity>
                            <View style={{...styles.heading,marginBottom:20}}>
                                <Image
                                resizeMode="contain"
                                style={{width:responsiveFontSize(13),height:responsiveFontSize(12)}}
                                source={require('../../../assets/logo.png')}
                                />
                                <Text style={{fontSize:30,color:'white',fontWeight:'bold'}}>
                                    Forget Password
                                </Text>
                            </View>
                        <Animated.View style={{...styles.child,backgroundColor:colors.background,transform:[{translateY}]}}>
                            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginVertical:5}}>
                                <ResetPasswordIcon
                                name="lock-reset"
                                color={colors.card}
                                size={responsiveFontSize(10)}
                                />
                            </View>
                            <Text style={{width:'100%',textAlign:'center',fontSize:16,color:'grey'}}>
                                Please enter your email address, {'\n'}
                                we will send you a link to reset password
                            </Text>
                                    <InputField
                                    error={!fields.email&& submit?true:null}
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
                                    placeHolder="Email"
                                    color="grey"
                                    />
                                {data.success==false?(
                                    <View>
                                    <Text style={{fontSize:12,color:'red',width:'100%',textAlign:'center'}}>email not found</Text>
                                </View>
                                ):null}
                                <View style={{marginVertical:responsiveFontSize(1)}}>
                                <Btn
                                text="Reset Password"
                                loader={loader}
                                call={onForgetPassword}
                                />
                                </View>
                        </Animated.View>
                    </View>
                </View>
    )
}


const styles=StyleSheet.create({
    con:{
        flex:1,
        width:'100%',
        alignItems:'center'
    },
    child:{
        width:'100%',
        flex:1,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        padding:responsiveFontSize(3),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    },
    heading:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default connect(null,actions)(ForgetPassword);
