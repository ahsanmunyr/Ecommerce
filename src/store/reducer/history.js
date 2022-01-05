import {
    GET_HISTORY
} from "../action/type"
    
    
const initialState=[];
    
    
export default function history(state=initialState,action){
    switch(action.type){
        case GET_HISTORY:
            return action.payload
        default :
            return state
    }
}