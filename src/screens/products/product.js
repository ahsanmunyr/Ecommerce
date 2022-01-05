import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native";
import {connect} from "react-redux";
import * as actions from "../../store/action"

function Product ({navigation,getCategory,categories}){
    const {colors}=useTheme();
    const [loading,setLoading]=useState(true)
    const [data,setData]=useState([
        {
            name:"Shoes",
            img:require('../../../assets/cat/1.png')
        },
        {
            name:"Perfome",
            img:require('../../../assets/cat/2.png')
        },
        {
            name:"Camera",
            img:require('../../../assets/cat/3.png')
        },
        {
            name:"Mobile",
            img:require('../../../assets/cat/4.png')
        },
        {
            name:"T-shirt",
            img:require('../../../assets/cat/5.png')
        },
        
    ])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
              <TouchableOpacity style={{paddingRight:responsiveWidth(5)}}>
                  <ProfileIcon name="user-circle" size={22} color='white'/>
              </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        getCategory().then(()=>setLoading(false))
    },[])



    function renderProduct({item}){
        return(
            <TouchableOpacity 
            onPress={()=>navigation.push("productList",{id:item.id})}
            activeOpacity={0.7} style={styles.catCon}>
                <View style={{width:responsiveWidth(95),...styles.catInCon,backgroundColor:colors.background}}>
    
                    <Image
                    style={{width:'100%',height:responsiveHeight(30),justifyContent:'flex-end',alignItems:'center'}}
                    source={{uri:item.image}}
                    />
                    <Text style={{fontSize:responsiveFontSize(4),textAlign:'center',fontFamily:"Montserrat-Bold",width:'100%',textTransform:'uppercase',color:colors.card,marginTop:responsiveFontSize(0.5)}}>{item.name}</Text>
     
                </View>
            </TouchableOpacity>
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <FlatList
                contentContainerStyle={{paddingBottom:10,alignItems:'center'}}
                showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={renderProduct}
                keyExtractor={(item,i)=>i.toString()}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    catCon:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    catInCon:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical:responsiveFontSize(1),
        padding:responsiveFontSize(1)
    }
})

function mapStateToProp({categories}){
    return {categories}
}

export default connect(mapStateToProp,actions)(Product);
