import {
    GET_CATEGORY
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function categories(state=initialState,action){
        switch(action.type){
            case GET_CATEGORY:
                return action.payload
            default :
                return state
        }
    }