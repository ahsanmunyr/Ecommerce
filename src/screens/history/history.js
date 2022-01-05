import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import BasketIcon from "react-native-vector-icons/Fontisto";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native";
import NotifyModel from '../../components/notifyModel';
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import { justifyContent } from 'styled-system';
import { connect } from 'react-redux';
import * as actions from "../../store/action"

function History ({navigation,id,history,getHistory,getProfile}){
    const {colors}=useTheme();
    const [loading,setLoading]=useState(true)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
                <TouchableOpacity 
                onPress={()=>navigation.jumpTo('profile')}
                style={{paddingRight:responsiveWidth(5)}}>
                    <ProfileIcon name="user-circle" size={22} color='white'/>
                </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        getHistory(id).then(()=>setLoading(false))
        getProfile(id)
    },[])



    function renderProduct({item}){
        const data=JSON.parse(item.data)

        function titleText(){
            let text=""
            data.forEach((item)=>{
                text=text+", "+item.title
            })
            return text
        }
        return(
            <TouchableOpacity 
            onPress={()=>navigation.push('historyDetail',{...item,data:data})}
            activeOpacity={0.7} style={{...styles.con,backgroundColor:colors.background}}>
                <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                    <BasketIcon 
                    name="shopping-basket-add"
                    size={30}
                    color={colors.card}
                    />
                </View>
                <View style={{justifyContent:'center',width:'75%'}}>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:responsiveFontSize(2),marginVertical:responsiveFontSize(0.2)}}>
                <Text style={{color:colors.card,fontFamily:'Montserrat-Medium',marginVertical:responsiveFontSize(0.2)}}>{titleText().length>25?titleText().slice(2,25)+"...":titleText().slice(2,titleText().length)}</Text>
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}>{item.id}</Text>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:responsiveFontSize(2),marginVertical:responsiveFontSize(0.2)}}>
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}>price: {item.total_price}$</Text>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:responsiveFontSize(2),marginVertical:responsiveFontSize(0.2)}}>
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}>Item: {data.length}</Text>
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}>{item.created_at.slice(0,10)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                {true?(
                    <FlatList
                    contentContainerStyle={{paddingBottom:responsiveFontSize(1),alignItems:'center',paddingHorizontal:responsiveFontSize(1)}}
                    showsVerticalScrollIndicator={false}
                    data={history.reverse()}
                    renderItem={renderProduct}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                ):(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <NotFoundIcon
                        name="search1"
                        size={responsiveFontSize(10)}
                        color="grey"
                        />
                        <Text style={{fontSize:responsiveFontSize(5),color:'grey',fontFamily:'Montserrat-Bold'}}>Not Found</Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    con:{
        width:'100%',
        flexDirection:'row',
        shadowColor: "#000",
        marginVertical:responsiveFontSize(1),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical:responsiveFontSize(1.5),
        elevation: 5,
        borderRadius:7
    }
})

function mapStateToProps({user,history}){
    return{history,id:user.data.data.id,}
}

export default connect(mapStateToProps,actions)(History);
