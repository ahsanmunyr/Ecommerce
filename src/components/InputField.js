import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import ErrorIcon from "react-native-vector-icons/MaterialIcons"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import {useTheme} from "@react-navigation/native"

function InputField ({placeHolder,icon,getValue,password,keyboardType,defaultValue,color,error}){
    const {colors}=useTheme();
    return (
        <View style={styles.con}>
            <View style={{position:'absolute',left:1}}>
                {icon()}
            </View>
            <TextInput
            defaultValue={defaultValue?defaultValue:null}
            value={defaultValue?defaultValue:null}
            keyboardType={keyboardType==="number"?'number-pad':'default'}
            secureTextEntry={password?true:false}
            onChangeText={(v)=>getValue(v)}
            placeholder={placeHolder}
            placeholderTextColor={color}
            style={{...styles.input,color:color,borderColor:colors.card}}
            />
            {error?(
                <View style={{position:'absolute',right:1}}>
                    <ErrorIcon
                    name="error"
                    color="#c62f1c"
                    size={18}
                    />
                </View>
            ):null}
        </View>

      );
}

const styles=StyleSheet.create({
input:{
    borderBottomWidth:1,
    flex: 1,
    paddingTop: responsiveHeight(1.5),
    paddingRight: 10,
    paddingBottom: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(8),

},
con: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:5
},
})

export default InputField