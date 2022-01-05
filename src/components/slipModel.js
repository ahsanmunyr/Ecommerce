import React, { Component, useEffect } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity, Touchable, ScrollView} from 'react-native'
import IconCross from "react-native-vector-icons/Entypo"
import {useTheme} from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import IconSuccess from "react-native-vector-icons/AntDesign"
import { connect } from 'react-redux';
import * as actions from "../store/action"

const {width,height}=Dimensions.get('window')
function NotifyModel({visible,closeModle,title,slip,name}){
    const {colors}=useTheme()

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={{...styles.con,backgroundColor:colors.background}}>
                    <View style={{...styles.btn,backgroundColor:colors.card,flexDirection:'row'}}>
                        <Text style={{fontSize:responsiveFontSize(2),width:'85%',textAlign:'center',color:'white',fontFamily:'Montserrat-Bold'}}>ORDER SLIP</Text>
                        <TouchableOpacity onPress={()=>{
                            closeModle()
                        }}>
                            <IconCross name="cross" color="white" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent:'center',width:'100%',alignItems:'center',marginVertical:responsiveFontSize(2)}}>
                        <IconSuccess name="checkcircle" color="green" size={35}/>
                        <Text style={{color:'gray',marginTop:20,textAlign:'center',width:'90%'}}>{title.toUpperCase()}</Text>
                        <Text style={{textAlign:'center',marginTop:responsiveFontSize(1),width:'90%'}}>
                        Thanks for shopping with us !{"\n"} your order will be deliver within 7 working days
                        </Text>
                        <Text style={{textAlign:'center',fontSize:responsiveFontSize(2),marginTop:responsiveFontSize(1),width:'90%',color:colors.text,fontFamily:"Montserrat-Bold"}}>
                            ORDER ID: {slip.id}
                        </Text>
                    </View>
                    <ScrollView style={{flex:4,width:'90%',paddingTop:10}}>
                        <View>
                        <View style={{width:'100%',flexDirection:'row',alignItems:'center',borderTopWidth:0.75,borderBottomWidth:0.75,borderColor:colors.card,paddingVertical:responsiveFontSize(0.75),marginTop:responsiveFontSize(1)}}>
                            <Text  style={{...styles.text,width:'40%'}}>Item</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Unit Cost</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Quantity</Text>
                            <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>Amount</Text>
                        </View>
                        {slip.data.map((item,i)=>{
                            return(
                                <View key={i} style={{width:'100%',flexDirection:'row',alignItems:'center',borderBottomWidth:0.75,borderColor:'grey',paddingVertical:responsiveFontSize(0.75)}}>
                                    <Text  style={{...styles.text,width:'40%'}}>{item.title}</Text>
                                    <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>${item.price}</Text>
                                    <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>x{item.quantity}</Text>
                                    <Text  style={{...styles.text,width:'20%',textAlign:'center'}}>${item.price*item.quantity}</Text>
                                </View>
                            )
                        })}
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                                <View style={{width:'100%',flexDirection:'row',alignItems:'center',borderBottomWidth:0.75,borderColor:colors.card,paddingVertical:responsiveFontSize(0.75)}}>
                                    <Text  style={{...styles.text,width:'80%',textAlign:"left",color:colors.card,fontFamily:'Montserrat-Medium'}}>Total</Text>
                                    <Text  style={{...styles.text,fontFamily:'Montserrat-Medium',width:'20%',textAlign:'center',color:colors.text}}>${slip.total_price}</Text>
                                </View>
                        </View>
                        </View>
                        <View style={{marginTop:responsiveFontSize(2)}}>
                            <Text style={{fontFamily:'Montserrat-Medium',fontSize:responsiveFontSize(1.5),color:colors.text,marginTop:responsiveFontSize(0.5)}}>Bill To:</Text>
                            <Text style={{fontSize:responsiveFontSize(1.5),color:'grey'}}>{name}</Text>
                            <Text style={{fontFamily:'Montserrat-Medium',fontSize:responsiveFontSize(1.5),color:colors.text,marginTop:responsiveFontSize(0.5)}}>Email:</Text>
                            <Text style={{fontSize:responsiveFontSize(1.5),color:'grey'}}>{slip.email}</Text>
                            <Text style={{fontFamily:'Montserrat-Medium',fontSize:responsiveFontSize(1.5),color:colors.text,marginTop:responsiveFontSize(0.5)}}>Mobile No</Text>
                            <Text style={{fontSize:responsiveFontSize(1.5),color:'grey'}}>{slip.phone_number}</Text>
                            <Text style={{fontFamily:'Montserrat-Medium',fontSize:responsiveFontSize(1.5),color:colors.text,marginTop:responsiveFontSize(0.5)}}>Address:</Text>
                            <Text style={{fontSize:responsiveFontSize(1.5),color:'grey'}}>{slip.address}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        justifyContent:'space-between',
        alignItems:'center',
        width:width/1.1,
        height:height/1.1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius:20
    },
    iconCon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
        paddingVertical:8,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    icon:{
        backgroundColor:'white',
        borderWidth:4,
        borderColor:'#001441',
        width:'18%',
        height:'18%',
        borderRadius:'18%'/2,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:responsiveFontSize(1.35),
        color:'grey'
    }
})

function mapStateToProps({slip}){
    return{
        slip}
}

export default connect(mapStateToProps,actions)(NotifyModel);