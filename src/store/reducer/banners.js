import {
    GET_BANNERS
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function banners(state=initialState,action){
        switch(action.type){
            case GET_BANNERS:
                return action.payload;
            default :
                return state
        }
    }