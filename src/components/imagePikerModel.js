import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import CameraIcon from "react-native-vector-icons/AntDesign"
import GalleryIcon from "react-native-vector-icons/FontAwesome"
import CrossIcon from "react-native-vector-icons/Entypo"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    responsiveScreenFontSize,
    responsiveScreenHeight
  } from "react-native-responsive-dimensions";
import {useTheme} from "@react-navigation/native"
  
const {width,height}=Dimensions.get('screen')
function ImagePickerModal({visible,closeModle,goToCamera,goToGallery}){

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
                        <TouchableOpacity
                        style={{marginLeft:responsiveWidth(2)}}
                        onPress={()=>{
                            closeModle()
                        }}
                        >
                            <CrossIcon name="cross" color="white" size={responsiveScreenFontSize(3.5)}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',width:'100%',alignItems:'center'}}>
                        <TouchableOpacity 
                        onPress={()=>goToCamera()}
                        style={{marginLeft:responsiveWidth(5),width:responsiveWidth(22),height:responsiveWidth(22),borderRadius:7,borderColor:colors.card,borderWidth:3,justifyContent:'center',alignItems:'center'}}>
                        <CameraIcon
                        size={responsiveScreenFontSize(6)}
                        color={colors.card}
                        name="camerao"
                        
                        />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>goToGallery()}
                        style={{marginRight:responsiveWidth(5),width:responsiveWidth(22),height:responsiveWidth(22),borderRadius:7,borderColor:colors.card,borderWidth:3,justifyContent:'center',alignItems:'center'}}>
                        <GalleryIcon
                        size={responsiveScreenFontSize(6)}
                        color={colors.card}
                        name="photo"
                        />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        justifyContent:'space-between',
        alignItems:'center',
        width:width/1.5,
        height:height/3,
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
        height:responsiveScreenHeight(4),
        width:'100%',
        justifyContent:'center',
        alignItems:'flex-start',
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:2
    }
})
export default ImagePickerModal;