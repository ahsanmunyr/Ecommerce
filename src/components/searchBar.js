import React, { useState } from 'react';
import { View ,TextInput,TouchableOpacity} from 'react-native';
import SearchIcon from "react-native-vector-icons/FontAwesome"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import {useTheme} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/native";
import * as actions from "../store/action"
import { connect } from 'react-redux';

function SearchBar(){
    const {colors}=useTheme();
    const navigation=useNavigation()
    const [searchText,setSearctText]=useState("")
    function onSearch(){
        if(searchText){
            navigation.push("search",{text:searchText})
        }
    }
    return(
        <View style={{width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <View
                style={{
                    borderTopLeftRadius:7,
                    borderBottomLeftRadius:7,
                    backgroundColor:colors.background,
                    justifyContent:'center',
                    height:responsiveHeight(4),
                    width:'70%'}}>
                <TextInput
                placeholder="Search Now"
                placeholderTextColor="#b8b8b8"
                 onChangeText={(v)=>setSearctText(v)}
                 style={{width:'80%',paddingVertical:0,paddingLeft:responsiveFontSize(1),fontSize:responsiveFontSize(1.5)}}
                 />
                </View>
                <TouchableOpacity 
                onPress={onSearch}
                style={{
                    borderTopRightRadius:7,
                    borderBottomRightRadius:7,
                    height:responsiveHeight(4),
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

export default connect(null, actions)(SearchBar);
