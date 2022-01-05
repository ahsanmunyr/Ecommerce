import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,TextInput} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import ProductItem from '../../components/productItem';
import {useTheme} from "@react-navigation/native";
import SearchBar from '../../components/searchBar';
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import * as actions from "../../store/action";
import {connect} from "react-redux";


function Home ({navigation,getBanners,banners,latestProduct,getLatestProduct}){
    const {colors}=useTheme();
    const [images,setImages]=useState([
        require('../../../assets/1.png'),
        require('../../../assets/2.png'),
        require('../../../assets/3.png')
    ])
    const [loading,setLoading]=useState(true)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props =>(
                <View style={{width:'98%'}}>
                    <SearchBar/>
                </View>
            ),
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
        Promise.all([getBanners(),getLatestProduct()]).then(()=>{
            setLoading(false)
        })
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
                <SliderBox
                inactiveDotColor="#ee6709"
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={responsiveHeight(30)}
                imageLoadingColor="#ee6709"
                images={banners.map((item)=>item.imgs_path)}
                />
                <View>
                    <View style={styles.latestLabel}>
                        <Text style={{color:'grey'}}>
                            Latest Products
                        </Text>
                    </View>
                </View>
                {latestProduct.length>0?(
                    <FlatList
                    contentContainerStyle={{paddingBottom:10,alignContent:'space-around'}}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={latestProduct}
                    renderItem={renderProduct}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                ):(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <NotFoundIcon
                        name="search1"
                        size={responsiveFontSize(8)}
                        color="grey"
                        />
                        <Text style={{fontSize:responsiveFontSize(4),color:'grey',fontFamily:'Montserrat-Bold'}}>Not Found</Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    sliderCon:{
        height:responsiveHeight(30),
        backgroundColor:'green',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    latestLabel:{
        padding:responsiveFontSize(2),
        borderBottomWidth:0.5,
        borderColor:'#ee6709'
    }
})

function mapStateToProp({banners,latestProduct}){
    return {banners,latestProduct}
}

export default connect(mapStateToProp,actions)(Home);
