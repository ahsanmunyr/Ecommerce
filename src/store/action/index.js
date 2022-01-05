import axios from "axios"
import {
    LOGIN,
    FORGET_PASSWORD,
    THEME,
    ADDTOCARD,
    GET_PROFILE,
    GET_BANNERS,
    DELECT_CARD_ITEM,
    GET_CATEGORY,
    GET_PRODUCT,
    GET_NOTIFICATION,
    GET_LATEST_PRODUCT,
    GET_SEARCH_PRODUCT,
    CLEAR_BUSKET,
    GET_SLIP,
    GET_HISTORY
} from "./type"
import AsyncStorage from "@react-native-community/async-storage"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {api} from "../../config/config.json"                                                                        



export const login=(data)=>async dispatch=>{
    console.log(data)
    const res=await axios.post(`${api}/api/login`,data)
    console.log(res.data)
    res.data.success?await AsyncStorage.setItem('id',res.data.data.data.id.toString()):null
    dispatch({
        type:LOGIN,
        payload:res.data
    })
}

export const setUserOnload=(id)=>async dispatch=>{
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:id
                },
                error:null
            },
            success:true,
        }
    })
}

export const logOut=()=>async dispatch=>{
    await GoogleSignin.signOut()
    await AsyncStorage.removeItem('id')
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:null
                },
                error:null
            },
            success:null,
        }
    })
}

export const clearUser=()=>async dispatch=>{
    dispatch({
        type:LOGIN,
        payload:{
            data:{
                data:{
                    id:null
                },
                error:null
            },
            success:null,
        }
    })
}

export const registration=(data)=>async dispatch=>{
    data={
        first_name:data.firstName,
        last_name:data.lastName,
        email:data.email,
        number:data.mobileNo,
        password:data.password,
        address:data.address,
    }
    const res=await axios.post(`${api}/api/register`,data)
    res.data.success?await AsyncStorage.setItem('id',res.data.data.data.id.toString()):null
    dispatch({
        type:LOGIN,
        payload:res.data
    })
}

export const forgetPassword=(email)=>async dispatch=>{
    const res=await axios.post(`${api}/api/forgot`,{email:email})
    return res.data
}

export const addtocardAction=(data)=>async dispatch=>{
    dispatch({
        type:ADDTOCARD,
        payload:data
    })
}

export const deleteCardItem=(id)=>async dispatch=>{
    dispatch({
        type:DELECT_CARD_ITEM,
        payload:id
    })
}

export const getProfile=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/profile`,{id,id});
    dispatch({
        type:GET_PROFILE,
        payload:res.data.data
    })
}

export const editProfile=(data)=>async dispatch=>{
    const bodyForm=new FormData();
    bodyForm.append('first_name',data.first_name)
    data.last_name?bodyForm.append('last_name',data.last_name):null
    bodyForm.append('id',data.id)
    bodyForm.append('number',data.number)

    if(data.image.path){
        var file={
            uri:data.image.path,
            name:data.image.path.slice(data.image.path.lastIndexOf('/')+1,data.image.path.length),
            type:data.image.mime
        }
        bodyForm.append('image',file)
    }

    const res=await axios.post(`${api}/api/update_profile`,bodyForm);
}

export const getBanners=()=>async dispatch=>{

    const res=await axios.get(`${api}/api/slider`);

    dispatch({
        type:GET_BANNERS,
        payload:res.data.data
    })

}

export const changeTheme=(theme)=>async dispatch=>{
    dispatch({
        type:THEME,
        payload:theme
    })
}


export const getCategory=(theme)=>async dispatch=>{
    const res=await axios.get(`${api}/api/categories`);
    dispatch({
        type:GET_CATEGORY,
        payload:res.data.data
    })
}

export const getProducts=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/all_products`,{category_id:id});
    dispatch({
        type:GET_PRODUCT,
        payload:res.data.data
    })
}

export const getNotification=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/send`,{user_id:id});
    dispatch({
        type:GET_NOTIFICATION,
        payload:res.data.data
    })
}

export const getLatestProduct=(id)=>async dispatch=>{
    const res=await axios.get(`${api}/api/latest_products`);
    dispatch({
        type:GET_LATEST_PRODUCT,
        payload:res.data.data
    })
}
export const getSearchProduct=(text)=>async dispatch=>{
    const res=await axios.post(`${api}/api/search_products`,{text});
    dispatch({
        type:GET_SEARCH_PRODUCT,
        payload:res.data.data
    })
}

export const clearBusket=()=>async dispatch=>{
    dispatch({
        type:CLEAR_BUSKET,
        payload:[]
    })
}


export const sendOrder=(data)=>async dispatch=>{
    const res=await axios.post(`${api}/api/payment`,data);
    dispatch({
        type:GET_SLIP,
        payload:{...res.data.data,data:JSON.parse(res.data.data.data)}
    })
}

export const getHistory=(id)=>async dispatch=>{
    const res=await axios.post(`${api}/api/payment-history`,{user_id:id});
    dispatch({
        type:GET_HISTORY,
        payload:res.data.data
    })
}