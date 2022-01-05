import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import IconSuccess from "react-native-vector-icons/AntDesign"
import { useTheme } from '@react-navigation/native'

const {width,height}=Dimensions.get('window')
function SuccessModel({visible,closeModle,title,reDirect}){
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
                    <View style={{flex:1,justifyContent:'center',width:'100%',alignItems:'center'}}>
                        <IconSuccess name="checkcircle" color="green" size={35}/>
                        <Text style={{color:'gray',marginTop:20,textAlign:'center',width:'90%'}}>{title.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity style={{...styles.btn,backgroundColor:colors.card}} onPress={()=>{
                        reDirect?reDirect():null
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
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
        marginTop:15,
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:2
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
export default SuccessModel;