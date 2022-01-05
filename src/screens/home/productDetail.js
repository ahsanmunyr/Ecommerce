import React,{useEffect, useLayoutEffect, useState} from 'react';
import { View ,Text,TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import { SliderBox } from "react-native-image-slider-box";
import PlusIcon from "react-native-vector-icons/Entypo"
import {
    Select,
    CheckIcon,
    CircleIcon
  } from "native-base"
import Loader from "../../components/pageLoader"
import Btn from '../../components/btn';
import { height } from 'styled-system';
import { TextInput } from 'react-native-gesture-handler';
import SuccessModel from '../../components/succesModel';
import ErrorModel from '../../components/errorModel';
import * as actions from "../../store/action";
import {connect} from "react-redux"

function ProductDetail({navigation,addtocardAction,route,busket}){

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
                <TouchableOpacity 
                onPress={()=>navigation.jumpTo('profile')}
                style={{paddingRight:responsiveWidth(5)}}>
                    <ProfileIcon name="user-circle" size={22} color='white'/>
                </TouchableOpacity>
            ),
            
          });
    },[navigation])


    const {colors}=useTheme()
    const [loading,setLoading]=useState(true)
    const [submit,setSubmit]=useState(false)
    const [errorModel,setErrorModel]=useState(false)
    const [fields,setFields]=useState({
        color:"",
        size:"",
        quantity:1,
    })
    const [model,setModel]=useState(false)

    useEffect(()=>{
          setLoading(false)
    },[])

    function getValue(key,value){
        setFields({
            ...fields,
            [key]:value
        })
    }


    const {
    id,
    catgory_id,
    title,
    images,
    color,
    size,
    price,
    discount,
    desc
    }=route.params


    function addToCard(){
        setSubmit(true);
        if((fields.size==undefined?true:fields.size) && (fields.color==undefined?true:fields.color)){
            
            const exist=busket.filter((item)=>item.id===id)

            if(!exist.length>0){
                addtocardAction({...route.params,size:fields.size,color:fields.color,quantity:fields.quantity}).then(()=>{
                    setModel(true)
                })
            }else{
                setErrorModel(true)
            }
            setSubmit(false)
        }
    }
    
    if(loading){
        return <Loader/>
    }else{
        return(
            <ScrollView 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{flex:1}}>
                <SuccessModel
                title="Added to Busket"
                visible={model}
                closeModle={()=>setModel(false)}
                reDirect={()=>navigation.jumpTo("busket")}

                />
                <ErrorModel
                visible={errorModel}
                closeModle={()=>setErrorModel(false)}
                title="this item is already added to busket"
                />
                <SliderBox
                inactiveDotColor="#ee6709"
                sliderBoxHeight={responsiveHeight(35)}
                imageLoadingColor="#ee6709"
                images={[images]}
                />
                <View style={{width:'100%',justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{...styles.title,color:colors.card}}>{title}</Text>
                    <View style={{marginVertical:responsiveFontSize(1),width:'90%',...styles.desCon,padding:responsiveFontSize(2),backgroundColor:colors.background}}>
                        <Text style={{color:'grey',textAlign:'justify',fontSize:responsiveFontSize(1.5),lineHeight:responsiveFontSize(2)}}>{desc}</Text>
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(1)}}>
                    <Select
                    style={{height:responsiveHeight(5.5)}}
                        placeholderTextColor={!fields.size && submit?"#fc0303":null}
                        borderColor={!fields.size && submit?"#fc0303":colors.card}
                        variant="rounded"
                        selectedValue={fields.size}
                        minWidth={200}
                        accessibilityLabel="Select Sizes"
                        placeholder="Select Sizes"
                        onValueChange={(itemValue) => getValue("size",itemValue)}
                        _selectedItem={{
                        bg: colors.card,
                        endIcon: <CheckIcon size={responsiveFontSize(2)} />,
                        }}
                    >
                        {JSON.parse(size).map((s,i)=><Select.Item key={i} label={`Size: ${s.toString()}`} value={s.toString()} />)}
                    </Select>
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(1)}}>
                    <Select
                    style={{height:responsiveHeight(5.5)}}
                        placeholderTextColor={!fields.color && submit?"#fc0303":null}
                        borderColor={!fields.color && submit?"#fc0303":colors.card}
                        variant="rounded"
                        selectedValue={fields.color}
                        minWidth={200}
                        accessibilityLabel="Select Colors"
                        placeholder="Select Colors"
                        onValueChange={(itemValue) => getValue("color",itemValue)}
                        _selectedItem={{
                        bg: colors.card,
                        endIcon: <CheckIcon size={responsiveFontSize(2)} />,
                        }}
                    >
                        {JSON.parse(color).map((c,i)=><Select.Item key={i} startIcon={<CircleIcon color={c} size={responsiveFontSize(2)}/>} label={c} value={c} />)}
                    </Select>
                    </View>
                    <View style={{marginVertical:responsiveFontSize(1),width:'90%',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.card,height:responsiveFontSize(5),width:'30%',borderRadius:7}}>
                            <Text
                            style={{color:'white',fontFamily:'Montserrat-Medium'}}
                            >Quantity</Text>
                        </View>
                        <TextInput
                        editable={false}
                        keyboardType="number-pad"
                        style={{color:colors.text,borderColor:'#d1d1d1',borderWidth:1,borderRadius:7,height:responsiveFontSize(5),width:'32%',paddingLeft:responsiveWidth(2),fontFamily:'Montserrat-Bold'}}
                        defaultValue={fields.quantity.toString()}
                        />
                        <TouchableOpacity 
                        onPress={()=>setFields({...fields,quantity:fields.quantity+1})}
                        style={{borderColor:"green",borderWidth:1,borderRadius:7,height:responsiveFontSize(5),justifyContent:'center',alignItems:'center',width:'15%'}}>
                            <PlusIcon
                            name="plus"
                            color={"green"}
                            size={30}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>fields.quantity>1?setFields({...fields,quantity:fields.quantity-1}):null}
                        style={{borderColor:"red",borderWidth:1,borderRadius:7,height:responsiveFontSize(5),justifyContent:'center',alignItems:'center',width:'15%'}}>
                            <PlusIcon
                            name="minus"
                            color={"red"}
                            size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'90%',marginVertical:responsiveFontSize(1)}}>
                        <Btn
                        text="Add to Busket"
                        call={addToCard}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    title:{
        fontSize:responsiveFontSize(3),
        width:'90%',
        paddingVertical:responsiveFontSize(1)
    },
    desCon:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius:7,
        elevation: 5,
    }
})

function mapStateToProps({busket}){
    return{busket}
}

export default connect(mapStateToProps,actions)(ProductDetail);
