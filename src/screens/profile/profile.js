import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View ,Text,TouchableOpacity,Image, StyleSheet,ImageBackground,ScrollView} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  import LogoutIcon from "react-native-vector-icons/AntDesign";
  import {useTheme} from "@react-navigation/native"
import { TextInput } from 'react-native-gesture-handler';
import Btn from "../../components/btn";
import CameraIcon from "react-native-vector-icons/Entypo";
import ImageModel from "../../components/imagePikerModel";
import ImagePicker, { openCamera } from 'react-native-image-crop-picker';
import * as actions from "../../store/action"
import {connect} from "react-redux";
import SuccesModel from "../../components/succesModel"
import {Switch} from "native-base"
import ThemeIcon from 'react-native-vector-icons/Feather';
import Loader from '../../components/pageLoader';
import messaging from '@react-native-firebase/messaging';

function Profile({navigation,editProfile,changeTheme,theme,logOut,getProfile,id,profile}){
    const {colors}=useTheme()
    const [imgModel,setImgModel]=useState(false)
    const [model,setModel]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [loader,setLoader]=useState(false)
    const [loading,setLoading]=useState(true)
    const [fields,setFields]=useState({
        image:"",
        first_name:"",
        last_name:"",
        email:"",
        number:"",
        address:"",
    })
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
              <TouchableOpacity 
              onPress={logOut}
              style={{paddingRight:responsiveWidth(5)}}>
                  <LogoutIcon name="logout" size={22} color='white'/>
              </TouchableOpacity>
            )
            
          });
    },[])

    useEffect(()=>{
        getProfile(id).then(()=>{
            setLoading(false)
        })
    },[])
    const profileMemo=useMemo(()=>{
        const exist=Object.keys(profile)
        if(exist){
            setFields(profile)
        }
    },[profile])
    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function openGallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
            getValue("image",image)
            setImgModel(false)
          });
    }

    function openCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
            getValue("image",image)
            setImgModel(false)
          });
    }

    function onEditProfile(){
        setSubmit(true)
        if(fields.first_name && fields.number && fields.address){
            setLoader(true)
            setSubmit(false)
            editProfile(fields).then(()=>{
                setLoader(false)
                setModel(true)
                getValue("imageEdit",false)
            }).catch((err)=>{
                console.log(err)
                setLoader(false)
            })
        }
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <ImageBackground 
            source={require("../../../assets/profile.png")}
            style={{width:'100%',flex:1}}>
                <ImageModel
                visible={imgModel}
                closeModle={()=>setImgModel(false)}
                goToCamera={openCamera}
                goToGallery={openGallery}
                />
                <SuccesModel
                closeModle={()=>setModel(false)}
                title="Update Successfully"
                visible={model}
                />
                <ScrollView>
                <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{...styles.imgCon,backgroundColor:colors.background,width:responsiveFontSize(15),height:responsiveFontSize(15),borderRadius:responsiveFontSize(15)/2,marginTop:responsiveHeight(3)}}>
                    <Image
                    style={{width:responsiveFontSize(15),height:responsiveFontSize(15),borderRadius:responsiveFontSize(15)/2}}
                    source={fields.image?{uri:(fields.image.path?fields.image.path:fields.image)}:require("../../../assets/profilepic.png")}
                    />
                    </View>
                    <TouchableOpacity 
                    onPress={()=>setImgModel(true)}
                    style={{position:'absolute',left:responsiveWidth(58),bottom:responsiveHeight(1),width:responsiveFontSize(4),height:responsiveFontSize(4),borderRadius:responsiveFontSize(4)/2,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
                        <CameraIcon
                        name="camera"
                        size={16}
                        color="white"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:responsiveFontSize(1.5),width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:responsiveFontSize(3),fontFamily:'Montserrat-Medium',textTransform:'uppercase',color:colors.text}}>Altaf Korejo</Text>
                </View>
                <View style={{marginTop:responsiveFontSize(1.5),width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',width:'30%',backgroundColor:'#eaeaea',paddingVertical:5,borderRadius:10,justifyContent:'space-around',alignItems:'center'}}>
                    <ThemeIcon
                    name={theme=="dark"?"moon":"sun"}
                    size={responsiveFontSize(3)}
                    color="black"
                    />
                    <Switch 
                    onToggle={()=>{
                        changeTheme(theme=="dark"?"light":"dark")
                    }}
                    isChecked={theme=="dark"?true:false}
                    offTrackColor="#ffffff" 
                    onThumbColor="#ffffff"
                    offThumbColor="#000000"
                    onTrackColor="#000000"
                    size="md"/>
                    </View>
                </View>
                <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:responsiveFontSize(1)}}>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(0.25)}}>
                        <Text style={{color:colors.text,marginVertical:responsiveFontSize(1),marginLeft:responsiveFontSize(1)}}>First Name</Text>
                        <TextInput
                        placeholder="first name"
                        defaultValue={fields.first_name}
                        onChangeText={(e)=>getValue("first_name",e)}
                        value={fields.first_name}
                        style={{color:colors.text,backgroundColor:colors.background,borderColor:!fields.first_name && submit?"red":colors.card,borderWidth:1,borderRadius:responsiveFontSize(5),padding:responsiveFontSize(0.75),paddingLeft:responsiveFontSize(2)}}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(0.25)}}>
                        <Text style={{color:colors.text,marginVertical:responsiveFontSize(1),marginLeft:responsiveFontSize(1)}}>Last Name</Text>
                        <TextInput
                        placeholder="last name (optional)"
                        defaultValue={fields.last_name}
                        value={fields.last_name}
                        onChangeText={(e)=>getValue("last_name",e)}
                        style={{color:colors.text,backgroundColor:colors.background,borderColor:colors.card,borderWidth:1,borderRadius:responsiveFontSize(5),padding:responsiveFontSize(0.75),paddingLeft:responsiveFontSize(2)}}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(0.25)}}>
                        <Text style={{color:colors.text,marginVertical:responsiveFontSize(1),marginLeft:responsiveFontSize(1)}}>Email</Text>
                        <TextInput
                        editable={false}
                        placeholder="email"
                        defaultValue={fields.email}
                        style={{color:colors.text,backgroundColor:colors.background,borderColor:colors.card,borderWidth:1,borderRadius:responsiveFontSize(5),padding:responsiveFontSize(0.75),paddingLeft:responsiveFontSize(2)}}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(0.25)}}>
                        <Text style={{color:colors.text,marginVertical:responsiveFontSize(1),marginLeft:responsiveFontSize(1)}}>Number</Text>
                        <TextInput
                        placeholder="Number"
                        defaultValue={fields.number}
                        onChangeText={(e)=>getValue("number",e)}
                        style={{color:colors.text,backgroundColor:colors.background,borderColor:!fields.number && submit?"red":colors.card,borderWidth:1,borderRadius:responsiveFontSize(5),padding:responsiveFontSize(0.75),paddingLeft:responsiveFontSize(2)}}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(0.25)}}>
                        <Text style={{color:colors.text,marginVertical:responsiveFontSize(1),marginLeft:responsiveFontSize(1)}}>Address</Text>
                        <TextInput
                        numberOfLines={3}
                        placeholder="Address"
                        textAlignVertical="top"
                        onChangeText={(e)=>getValue("address",e)}
                        defaultValue={fields.address}
                        style={{color:colors.text,backgroundColor:colors.background,borderColor:!fields.address && submit?"red":colors.card,borderWidth:1,borderRadius:responsiveFontSize(5),padding:responsiveFontSize(0.75),paddingLeft:responsiveFontSize(3)}}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(2)}}>
                        <Btn
                        text="Update"
                        loader={loader}
                        call={onEditProfile}
                        />
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(1),}}>
                        <Btn
                        text="logout"
                        call={()=>{
                            logOut()
                            messaging()
                            .unsubscribeFromTopic('ecomerce')
                            .then(() => console.log('unSubscribed to topic!'));
                        }}
                        color="#db1616"
                        />
                    </View>
                </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles=StyleSheet.create({
    imgCon:{
    }
})

function mapStateToProps({theme,user,profile}){
    return {
        theme,
        id:user.data.data.id,
        profile
    }
}

export default connect(mapStateToProps,actions)(Profile);
