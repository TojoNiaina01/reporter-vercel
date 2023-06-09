import { setCookie, deleteCookie } from "cookies-next"
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'


export const loginUser = (userData) => {
    setCookie('token_', userData.token)
    return {
        type: LOGIN,
        payload: userData
    }
}

export const logoutUser = () => {
    deleteCookie("token_")
    return {
        type: LOGOUT
    }
}
