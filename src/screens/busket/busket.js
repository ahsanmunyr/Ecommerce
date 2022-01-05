import React, { useEffect, useState,useLayoutEffect, useMemo } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native";
import DeleteModel from '../../components/deleteModel';
import * as actions from "../../store/action";
import Btn from '../../components/btn';
import {
    CircleIcon
  } from "native-base"
import {connect} from "react-redux"
import SlipModel from '../../components/slipModel';
import PaymentModel from '../../components/paymentModel';

function Busket ({navigation,busket,deleteCardItem,sendOrder,id,clearBusket,getProfile,profile}){
    const {colors}=useTheme();
    const [loading,setLoading]=useState(true)
    const [model,setModel]=useState(false)
    const [delModel,setDelModel]=useState(false)
    const [payModel,setPayModel]=useState(false)
    const [currentId,setCurrentId]=useState("")
    const [loader,setLoader]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [fields,setFields]=useState({})
    
    function getValue(k,v){
        setFields((pS)=>{
            return{
                ...pS,
                [k]:v
            }
        })
    }

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
        getProfile(id).then(()=>{
            setLoading(false)
        })
    },[])

    const profileMemo=useMemo(()=>{
        const {
            address,
            email,
            number
        }=profile;
        if(profile.id){
            getValue('email',email)
            getValue('address',address)
            getValue('phone_number',number)
        }
    },[profile])

    function orderNow(){
        setSubmit(true)
        if(fields.stripeToken && fields.email && fields.phone_number && fields.address){
            setLoader(true)
            sendOrder({...fields,data:busket,user_id:id,total_price:renderTotal(busket)}).then(()=>{
                setLoader(false)
                setModel(true)
                setPayModel(false)
                setSubmit(false)
                setFields({})
            })
        }
    }

    function renderTotal(bus){
        var totalPrice=0;
        if(bus.length>0){
            bus.forEach(item=>{
                totalPrice=(parseFloat(item.price)*parseFloat(item.quantity))+totalPrice    
            })
        }
        return totalPrice
    }



    function renderProduct({item}){
        return(
            <TouchableOpacity 
            activeOpacity={0.7} style={{...styles.con,backgroundColor:colors.background}}>
                <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                    <Image
                    style={{width:60,height:60}}
                    source={{uri:item.images}}
                    />
                </View>
                <View style={{justifyContent:'center',width:'50%'}}>
                    <Text style={{color:colors.card,fontFamily:'Montserrat-Medium',textTransform:'capitalize'}}>{item.title}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:responsiveFontSize(0.1)}}>
                        <CircleIcon color={item.color} size={responsiveFontSize(2)}/>  
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}> color </Text>  
                    </View> 
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Size: {item.size} </Text>
                    </View>
                    <View style={{marginLeft:responsiveFontSize(1)}}>
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Quantity: {item.quantity} </Text>
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Price: {`$${(parseFloat(item.price)*parseFloat(item.quantity))}`} </Text>
                    </View>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={()=>{
                    setCurrentId(item.id)
                    setDelModel(true)
                }}
                style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                <DeleteIcon
                    name="delete"
                    size={30}
                    color="#d91e1e"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <DeleteModel
                visible={delModel}
                title="are you sure you want to delete this item?"
                closeModle={()=>setDelModel(false)}
                reDirect={()=>deleteCardItem(currentId)}
                />
                <SlipModel
                visible={model}
                title="Successfully Ordered"
                closeModle={()=>{
                    setModel(false)
                    clearBusket()
                    navigation.jumpTo("history")
                }}
                name={profile.first_name+" "+profile.last_name}
                />
                <PaymentModel
                visible={payModel}
                closeModle={()=>setPayModel(false)}
                fields={fields}
                getValue={getValue}
                submit={submit}
                totalAmount={renderTotal(busket)}
                orderNow={orderNow}
                loader={loader}
                />
                {busket.length>0?(
                    <>
                    <FlatList
                    contentContainerStyle={{paddingBottom:responsiveFontSize(1),alignItems:'center',paddingHorizontal:responsiveFontSize(1)}}
                    showsVerticalScrollIndicator={false}
                    data={busket}
                    renderItem={renderProduct}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                    <View style={{padding:responsiveFontSize(1)}}>
                        <Btn
                        text="Order now"
                        color="green"
                        loader={loader}
                        call={()=>setPayModel(true)}
                        />
                    </View>
                    </>
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
    },
    payment:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:responsiveFontSize(1.5),
        borderRadius:7
    }
})

function mapStateToProps({busket,user,profile}){
    return {
        busket,
        id:user.data.data.id,
        id:user.data.data.id,
        profile
    }
}

export default connect(mapStateToProps,actions)(Busket);
