import {
    GET_LATEST_PRODUCT
} from "../action/type"
    
    
const initialState=[];
    
    
export default function latestProduct(state=initialState,action){
    switch(action.type){
        case GET_LATEST_PRODUCT:
            return action.payload
        default :
            return state
    }
}