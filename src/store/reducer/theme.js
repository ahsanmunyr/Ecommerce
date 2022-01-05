import {
    THEME
    } from "../action/type"
    
    
    const initialState="light";
    
    
    export default function theme(state=initialState,action){
        switch(action.type){
            case THEME:
                return action.payload;
            default :
                return state
        }
    }