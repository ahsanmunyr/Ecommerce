import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity, Touchable, ScrollView} from 'react-native'
import IconCross from "react-native-vector-icons/Entypo"
import {useTheme} from "@react-navigation/native";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const {width,height}=Dimensions.get('window')
function NotifyModel({visible,closeModle,title,des}){
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
                    <View style={{...styles.btn,backgroundColor:colors.card}}>
                        <TouchableOpacity onPress={()=>{
                            closeModle()
                        }}>
                            <IconCross name="cross" color="white" size={25}/>
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={{flex:4,width:'90%',paddingTop:10}}>
                        <Text style={{color:colors.text,textTransform:'uppercase',fontFamily:'Montserrat-Medium',width:'100%',textAlign:'center'}}>{title}</Text>
                        <Text style={{color:'gray',textAlign:"justify",fontSize:12,marginTop:responsiveFontSize(1.5),backgroundColor:'#ececec',padding:responsiveFontSize(1),borderRadius:7,minHeight:responsiveHeight(50)}}>{des}</Text>
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
        width:width/1.15,
        height:height/1.5,
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
    }
})
export default NotifyModel;