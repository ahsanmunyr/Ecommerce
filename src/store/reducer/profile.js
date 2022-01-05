import {
    GET_PROFILE
    } from "../action/type"
    
    
    const initialState={};
    
    
    export default function profile(state=initialState,action){
        switch(action.type){
            case GET_PROFILE:
                return action.payload;
            default :
                return state
        }
    }