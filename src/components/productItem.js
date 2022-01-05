import React from 'react';
import { View ,Text,StyleSheet,Image, TouchableOpacity} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import HeartIcon from "react-native-vector-icons/FontAwesome";
import {useTheme} from "@react-navigation/native"

function ProductItem({price,title,img,oldPrice,call,latest}){
    const {colors}=useTheme()
    return(
        <TouchableOpacity 
        onPress={call}
        style={{...styles.con,backgroundColor:colors.background}}>
            {/* <TouchableOpacity
            style={{position:'absolute',zIndex:5,top:20,left:20}}
            >
                <HeartIcon
                size={responsiveFontSize(3)}
                name="heart"
                color={fav?"#ea1b38":'grey'}
                />
            </TouchableOpacity> */}
            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
            <Image
            style={{width:responsiveFontSize(20),height:responsiveFontSize(15),borderRadius:7,marginTop:responsiveFontSize(1)}}
            source={img}
            />
            </View>
            <View style={{width:'100%',padding:responsiveFontSize(1)}}>
            <Text style={{color:colors.text,width:'100%',textTransform:'uppercase',fontSize:12}}>{title.length>15?title.slice(15):title+"..."}</Text>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                <View style={{flexDirection:'row',width:'75%'}}>
                    <Text style={{color:colors.card,fontSize:12}}>{price}</Text>
                    <Text style={{paddingLeft:responsiveFontSize(1),fontSize:12,color:'grey',textDecorationLine:'line-through'}}>{oldPrice}</Text>
                </View>
                {latest?(
                    <View>
                    <Text style={{color:'red',fontSize:responsiveFontSize(1.5),fontFamily:'Montserrat-Medium'}}>NEW</Text>
                </View>
                ):null}
                </View>
            </View>
            <View 
            style={{...styles.btn,backgroundColor:colors.card}}>
                <Text style={{color:'white',fontSize:12}}>View Detail</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    con:{
        width:'45%',
        borderRadius:7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingTop:responsiveFontSize(1.5),
        elevation: 5,
        margin:responsiveFontSize(1)
    },
    btn:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:7,
        borderBottomRightRadius:7,
        padding:responsiveFontSize(0.75)
    }
})

export default ProductItem;
