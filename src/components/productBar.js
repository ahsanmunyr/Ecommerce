import React, { useState } from 'react';
import { View ,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import SearchIcon from "react-native-vector-icons/FontAwesome"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import {useTheme} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native"

function ProductBar({call}){
    const {colors}=useTheme();
    const navigation=useNavigation()
    const [searchText,setSearctText]=useState("")
    function onSearch(){
        if(searchText){
            navigation.push("search")
        }
    }
    return(
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',...styles.con,backgroundColor:colors.background,}}>
                <View
                style={{
                    borderTopLeftRadius:7,
                    borderBottomLeftRadius:7,
                    backgroundColor:colors.background,
                    height:responsiveHeight(5),
                    justifyContent:'center',
                    width:'80%'}}>
                <TextInput
                placeholder="Search Now"
                placeholderTextColor="#b8b8b8"
                 onChangeText={(v)=>setSearctText(v)}
                 style={{width:'100%',paddingVertical:0,paddingLeft:responsiveFontSize(1),fontSize:responsiveFontSize(1.5)}}
                 />
                </View>
                <TouchableOpacity 
                onPress={onSearch}
                style={{
                    borderTopRightRadius:7,
                    borderBottomRightRadius:7,
                    height:responsiveHeight(5),
                    backgroundColor:'#363636',
                    width:'20%',
                    justifyContent:'center',
                    alignItems:'center'}}>
                    <SearchIcon
                    name="search"
                    size={responsiveFontSize(2)}
                    color="white"
                    />
                 </TouchableOpacity>
             </View>
    )
}

const styles=StyleSheet.create({
    con:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        borderTopLeftRadius:7,
        borderBottomLeftRadius:7,
        borderTopRightRadius:7,
        borderBottomRightRadius:7,
    }
})

export default ProductBar;
