import {
    ADDTOCARD, CLEAR_BUSKET, DELECT_CARD_ITEM
    } from "../action/type"
    
    
    const initialState=[];
    
    
    export default function busket(state=initialState,action){
        switch(action.type){
            case ADDTOCARD:
                return [...state,action.payload];
            case DELECT_CARD_ITEM:
                console.log(action.payload)
                console.log(state)
                return [...state].filter((item)=>item.id!=action.payload)
            case CLEAR_BUSKET:
                return action.payload;
            default :
                return state
        }
    }