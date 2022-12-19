import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import { getUserFailed, getUsersStart, getUserSuccess } from './userSlice'

export const loginUser = async(user,dispatch,navigate)=> {
    dispatch(loginStart())
    try {
        const res = await axios.post("/user/login", user)
        console.log('login data', res)
        if (res && res.data && res.data.data){
            const resData = res.data.data
            console.log('res', res.data.data)
            sessionStorage.setItem("access_token", resData.access_token)
            sessionStorage.setItem("refresh_token", resData.refresh_token)
            dispatch(loginSuccess(res.data))
            navigate('/')
        }
    }
    catch(err){
        dispatch(loginFailed())
    }
}
export const registerUser = async(user,dispatch,navigate)=> {
    dispatch(registerStart())
    try {
        const res = await axios.post("/user", user)
        dispatch(registerSuccess(res.data))
        navigate('/login')
    }
    catch(err){
        dispatch(registerFailed())
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get("/user/getAll", {
            headers: {
                token: `Bearer ${accessToken}`
            }

        })
        dispatch(getUserSuccess(res.data))

    }
    catch(err){
        dispatch(getUserFailed)
    }
}