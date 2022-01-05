import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import ProductItem from '../../components/productItem';
import {useTheme} from "@react-navigation/native";
import ProductBar from '../../components/productBar';
import {connect} from "react-redux"
import * as actions from "../../store/action"

function ProductList ({navigation,route,getProducts,products}){
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
        getProducts(route.params.id).then(()=>setLoading(false))
    },[])

    
    function renderProduct({item}){
        return(
            <ProductItem
            title={item.title}
            price={`$${item.price}`}
            oldPrice={`$${Math.round(((parseInt(item.discount)/100)*item.price)+parseInt(item.price))}`}
            img={{uri:item.images}}
            call={()=>navigation.push('productDetail',item)}
            latest={item.is_latest?true:false}
            />
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <View style={{justifyContent:'center',alignItems:'center',padding:responsiveFontSize(1.5)}}>
                    <ProductBar/>
                </View>
                <FlatList
                contentContainerStyle={{paddingBottom:10,alignContent:'space-around'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item,i)=>i.toString()}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})

function mapStateToProps({products}){
    return {products}
}

export default connect(mapStateToProps,actions)(ProductList);
