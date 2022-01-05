import {
LOGIN
} from "../action/type"


const initialState={
    data:{
        data:{
            id:null
        }
    },
    error:null
};


export default function user(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return action.payload;
        default :
            return state
    }
}