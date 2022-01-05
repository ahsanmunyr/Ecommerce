import {
    GET_SLIP
} from "../action/type"
    
    
const initialState={data:[]};
    
    
export default function slip(state=initialState,action){
    switch(action.type){
        case GET_SLIP:
            return action.payload
        default :
            return state
    }
}