import Jwt  from "jsonwebtoken";
import { getCookie } from 'cookies-next';


const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'


const initialState = {
    userToken: null,
}

if(getCookie("token_")){
   Jwt.verify(getCookie("token_"), "GOvina@@123", (err, decoded) => {
    if(err){
        getCookie("token_");
    }else{
        initialState.user = decoded;
    }
   });
}



const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userToken: action.payload

            }
        case LOGOUT:
            return {
                ...state,
                userToken: null

            }
        default: return state
            
    }
}


export default authReducer;