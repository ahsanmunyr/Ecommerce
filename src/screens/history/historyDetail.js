import React,{useEffect, useLayoutEffect, useState} from 'react';
import { View ,Text,TouchableOpacity, StyleSheet,ScrollView,Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import { SliderBox } from "react-native-image-slider-box";
import PlusIcon from "react-native-vector-icons/Entypo"
import {
    Select,
    CheckIcon,
    CircleIcon
  } from "native-base"
import Loader from "../../components/pageLoader"
import Btn from '../../components/btn';
import { height } from 'styled-system';
import { TextInput } from 'react-native-gesture-handler';
import SuccessModel from '../../components/succesModel';
import ErrorModel from '../../components/errorModel';
import * as actions from "../../store/action";
import PrintIcon from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"

function HistoryDetail({navigation,route,profile}){

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
                <TouchableOpacity 
                onPress={()=>navigation.jumpTo('profile')}
                style={{paddingRight:responsiveWidth(5)}}>
                    <ProfileIcon name="user-circle" size={22} color='white'/>
                </TouchableOpacity>
            ),
            
          });
    },[navigation])


    const {colors}=useTheme()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
          setLoading(false)
    },[])
    function renderInvoiceList(){
        return route.params.data.map((item,i)=>{
            return(
                <View key={i} style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:'90%',flexDirection:'row',alignItems:'center',borderBottomWidth:0.75,borderColor:'grey',paddingVertical:responsiveFontSize(0.75)}}>
                        <Text  style={{...styles.text,width:'40%'}}>{item.title}</Text>
                        <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>${item.price}</Text>
                        <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>x{item.quantity}</Text>
                        <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>${item.price*item.quantity}</Text>
                    </View>
                </View>
            )
        })
    }

    const {
        email,
        id,
        phone_number,
        total_price,
        created_at,
        address
    }=route.params
    
    if(loading){
        return <Loader/>
    }else{
        return(
            <ScrollView 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{flex:1}}>
                <View
                style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:responsiveFontSize(2)}}
                >
                <Text style={{fontFamily:'Montserrat-Bold',fontSize:responsiveFontSize(3),paddingVertical:responsiveFontSize(2)}}>INVOICE</Text>
                <TouchableOpacity style={{marginRight:responsiveFontSize(2)}}>
                    <PrintIcon
                    name="printer"
                    size={30}
                    color={"grey"}
                    />
                </TouchableOpacity>
                </View>
                <View
                style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:responsiveFontSize(2)}}
                >
                    <Text style={{...styles.text}}>
                    Press is licensed by Bionetwork Ltd.{"\n"}
                    Our office is located {"\n"} 
                    building. Keas 69 Str.
                    </Text>
                    <Image
                    style={{width:60,height:60}}
                    source={require('../../../assets/logo.png')}
                    />
                </View>
                <View
                style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between',padding:responsiveFontSize(2)}}
                >
                    <View style={{width:'70%'}}>
                        <Text style={{...styles.text,fontFamily:'Montserrat-Medium',paddingBottom:responsiveFontSize(1)}}>BILL TO:</Text>
                        <Text style={{...styles.text,width:'70%',lineHeight:15}}>
                        Client Name: {profile.first_name+" "+profile.last_name}{"\n"}
                        Client Address:  {"\n"}{address}{"\n"}
                        Client Mobile No:  {phone_number}
                        </Text>
                    </View>
                    <View style={{width:'30%',alignItems:'flex-end'}}>
                        <Text style={{...styles.text,fontFamily:'Montserrat-Medium'}}>Invoice No:</Text>
                        <Text style={{...styles.text,paddingBottom:responsiveFontSize(1)}}>{id}</Text>
                        <Text style={{...styles.text,fontFamily:'Montserrat-Medium'}}>Date:</Text>
                        <Text style={{...styles.text}}>{created_at.slice(0,10)}</Text>
                    </View>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:'90%',flexDirection:'row',alignItems:'center',borderTopWidth:0.75,borderBottomWidth:0.75,borderColor:colors.card,paddingVertical:responsiveFontSize(0.75),marginTop:responsiveFontSize(1)}}>
                            <Text  style={{...styles.text,width:'40%'}}>Item</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Unit Cost</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Quantity</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Amount</Text>
                        </View>
                </View>
                {renderInvoiceList()}
                <View style={{justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:'90%',flexDirection:'row',alignItems:'center',borderBottomWidth:0.75,borderColor:colors.card,paddingVertical:responsiveFontSize(0.75)}}>
                            <Text  style={{...styles.text,width:'80%',textAlign:"center",color:colors.card,fontFamily:'Montserrat-Medium'}}>Total</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>${total_price}</Text>
                        </View>
                </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    text:{
        fontSize:responsiveFontSize(1.35),
        color:'grey'
    }
})

function mapStateToProps({busket,profile}){
    return{busket,profile}
}

export default connect(mapStateToProps,actions)(HistoryDetail);
