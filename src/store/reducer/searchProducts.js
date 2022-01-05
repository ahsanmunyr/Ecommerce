import {
    GET_SEARCH_PRODUCT
} from "../action/type"
    
    
const initialState=[];
    
    
export default function searchProduct(state=initialState,action){
    switch(action.type){
        case GET_SEARCH_PRODUCT:
            return action.payload
        default :
            return state
    }
}