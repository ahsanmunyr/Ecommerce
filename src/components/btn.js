import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import {useTheme} from "@react-navigation/native"

function Btn ({text,call,color,loader}){
    const {colors}=useTheme()
    return (
        <TouchableOpacity 
        onPress={call}
        style={{...styles.blueBtn,backgroundColor:color?color:colors.card}}>
        {loader?(
            <ActivityIndicator size={responsiveFontSize(3)} color="white"/>
        ):(
            <Text style={{color:'white',fontSize:responsiveFontSize(2)}}>{text.toUpperCase()}</Text>
        )}
        </TouchableOpacity>
      );
}

const styles=StyleSheet.create({
    blueBtn:{
        width:'100%',
        borderRadius:responsiveFontSize(5),
        height:responsiveHeight(5.5),
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Btn