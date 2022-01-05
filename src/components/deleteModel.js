import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import DeleteIcon from "react-native-vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const {width,height}=Dimensions.get('window')
function DeleteModel({visible,closeModle,title,reDirect}){
    const {colors}=useTheme()
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <View style={{flex:1,justifyContent:'center',width:'100%',alignItems:'center'}}>
                        <DeleteIcon name="delete" color="#d91e1e" size={35}/>
                        <Text style={{color:'gray',marginTop:20,textAlign:'center',width:'90%'}}>{title.toUpperCase()}</Text>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginBottom:responsiveFontSize(4)}}>
                    <TouchableOpacity style={{...styles.btn,backgroundColor:'#d8d8d8'}} onPress={()=>{
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.btn,backgroundColor:colors.card}} onPress={()=>{
                        reDirect?reDirect():null
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
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
        height:responsiveHeight(4),
        width:'40%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:responsiveFontSize(1.5),
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
export default DeleteModel;