import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import EyeIcon from "react-native-vector-icons/Entypo"
function Password ({placeHolder,icon,getValue}){

    const [seePas,setSeePas]=useState(false);

    function showAndHide(){
        setSeePas(!seePas)
    }
    return (
        <View style={styles.con}>
            <View style={{position:'absolute',left:1}}>
                {icon()}
            </View>
            <TextInput
            secureTextEntry={!seePas}
            onChangeText={(v)=>getValue(v)}
            placeholder={placeHolder}
            style={styles.input}
            />
            <TouchableOpacity
            onPress={showAndHide} 
            style={{position:'absolute',right:1}}>
                <EyeIcon
                name="eye"
                size={20}
                color={seePas?"#1d879a":"gray"}
                />
            </TouchableOpacity>
        </View>

      );
}

const styles=StyleSheet.create({
input:{
    borderBottomColor:'gray',
    borderBottomWidth:1,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 30,

},
con: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:5
},
})

export default Password