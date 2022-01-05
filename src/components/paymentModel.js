import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import AddressIcon from "react-native-vector-icons/EvilIcons"
import MobileIcon from "react-native-vector-icons/AntDesign"
import { useTheme } from '@react-navigation/native'
import InputField from './InputField'
import MailIcon from "react-native-vector-icons/Fontisto";
import { CardField, useStripe ,StripeProvider} from '@stripe/stripe-react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import IconCross from "react-native-vector-icons/Entypo"
import Btn from './btn'

const {width,height}=Dimensions.get('window')
function PaymentModel({visible,closeModle,fields,getValue,submit,totalAmount,loader,orderNow}){
    const {colors}=useTheme()
    const {createToken } = useStripe();
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={{...styles.con,backgroundColor:colors.background}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:responsiveFontSize(2.5),fontFamily:'Montserrat-Medium',width:'95%',textAlign:'center'}}>PAYMENT</Text>
                        <TouchableOpacity onPress={()=>{
                                closeModle()
                            }}>
                                <IconCross name="cross" color="grey" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <InputField
                    error={!fields.email &&  submit?true:null}
                    defaultValue={fields.email}
                    getValue={(v)=>getValue('email',v)}
                    icon={()=>{
                        return(
                            <MailIcon 
                            name="email"
                            color={colors.card}
                            size={20}
                            />
                        )
                    }}
                    password={false}
                    placeHolder="Email"
                    color="grey"
                    />
                    <InputField
                    error={!fields.phone_number &&  submit?true:null}
                    getValue={(v)=>getValue('phone_number',v)}
                    defaultValue={fields.phone_number}
                    icon={()=>{
                        return(
                            <MobileIcon 
                            name="mobile1"
                            color={colors.card}
                            size={20}
                            />
                        )
                    }}
                    keyboardType="number"
                    password={false}
                    placeHolder="Mobile No"
                    color="grey"
                    />
                    <InputField
                    error={!fields.address &&  submit?true:null}
                    getValue={(v)=>getValue('address',v)}
                    defaultValue={fields.address}
                    icon={()=>{
                        return(
                            <AddressIcon 
                            name="location"
                            color={colors.card}
                            size={25}
                            />
                        )
                    }}
                    password={false}
                    placeHolder="Address"
                    color="grey"
                    />
                        <StripeProvider publishableKey="pk_test_51JAxIVDTGrqq3ff6IYrR0NvnkzFESSfjXzm5jCnstft5m7D6bw26sueDjr1wRWswqc9FcThsN5Qmhz8uVioqsXZ800sT3QBXFu">
                                <CardField
                                postalCodeEnabled={false}
                                placeholder={{
                                    number: '4242 4242 4242 4242',
                                }}
                                
                                cardStyle={{
                                    backgroundColor: '#FFFFFF',
                                    textColor: '#000000',
                                }}
                                style={{
                                    width: '100%',
                                    height: 50,
                                    marginVertical: responsiveFontSize(1),
                                }}
                                onCardChange={(cardDetails) => {
                                    if(cardDetails.complete){
                                        createToken(cardDetails).then(res=>{
                                            if(res.token){
                                                getValue('expireMonth',res.token.card.expMonth)
                                                getValue('stripeToken',res.token.id)
                                                getValue('lastNumber',res.token.card.last4)
                                            }
                                            
                                        })
                                    }
                                    
                                }}

                                />
                        </StripeProvider>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderTopWidth:0.75,borderColor:'grey',paddingVertical:responsiveFontSize(1),width:'100%'}}>
                            <Text style={{color:'grey'}}>Total:</Text>
                            <Text style={{color:'grey'}}>${totalAmount}</Text>
                        </View>
                        <View style={{padding:responsiveFontSize(1),width:'100%'}}>
                        <Btn
                        text="Order now"
                        color="green"
                        loader={loader}
                        call={orderNow}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        alignItems:'center',
        width:width,
        padding:responsiveFontSize(3),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderTopRightRadius:20,
        borderTopLeftRadius:20
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
export default PaymentModel;