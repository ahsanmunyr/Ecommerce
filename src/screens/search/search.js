import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import BasketIcon from "react-native-vector-icons/Fontisto";
import ProductItem from '../../components/productItem';
import Loader from '../../components/pageLoader';
import { connect } from 'react-redux';
import {useTheme} from "@react-navigation/native";
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import * as actions from "../../store/action"

function Search ({navigation,searchProduct,getSearchProduct,route}){
    const {colors}=useTheme();

    const [loading,setLoading]=useState(true)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity 
              onPress={()=>navigation.jumpTo('profile')}
              style={{paddingRight:responsiveWidth(3)}}>
                  <BasketIcon name="shopping-basket-add" size={20} color='white'/>
              </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        getSearchProduct(route.params.text).then(()=>setLoading(false))
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
                {
                    searchProduct.length>0?(
                        <FlatList
                        contentContainerStyle={{paddingBottom:10,alignContent:'space-around'}}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={searchProduct}
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
                    )
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({

})

function mapStateToProp({searchProduct}){
    return {searchProduct}
}
export default connect(mapStateToProp,actions)(Search);
