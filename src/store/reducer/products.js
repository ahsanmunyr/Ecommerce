import {
    GET_PRODUCT
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function products(state=initialState,action){
        switch(action.type){
            case GET_PRODUCT:
                return action.payload;
            default :
                return state
        }
    }