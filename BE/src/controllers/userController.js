
import { User } from '../models/UserModel.js'
import { 
    createUserService, 
    loginUserService, 
    getDetailsUserService, 
    searchUserService, 
    updateUserService,
    deleteUserService,
    getAllUserService,
    deleteAllUserService,
    refreshTokenService,
} from '../services/UserService.js'

const refreshTokens = []
export const userController = (req, res) => {
    res.send('user page')
}


export const detailsUserController = async (req, res) => {
    try{
        const { userId } = req.params
        if(userId) {
            const response = await getDetailsUserService(userId)
            return res.json(response)
        }
        return res.json({
            status: 'err',
            message: 'The id is required'
        })
    }catch(e){
        console.log(e)
        return res.json({
            status: 'err',
        })
    }
}

export const searchUserController = async (req, res) => {
    try{
        const { name } = req.query
        if(name){
            const response = await searchUserService(name)
            return res.json(response)
        }else {
            return res.json({
                status: 'err',
                message: 'The name is required'
            })
        }
    }catch(err){
        console.log(err)
        return res.json({
            status: 'err',
            message: err
        })
    }
}

export const userRefreshTokenController = async(req, res) => {
    try{
        const refreshToken = req.headers.token.split(' ')[1]
        if(refreshToken){
            const response = await refreshTokenService(refreshToken)
            console.log('refresh token', response)
            // res.cookie("refresh token", response.data.refresh_token, {
            //     httpOnly : true,
            //     secure : false,
            //     path: "/",
            //     sameSite: "strict"
            // })
            return res.json(response)
        }else {
            return res.json({
                message: 'The refreshTolken is not valid'
            })
        }
    }catch(err){
        return res.json({
            status: 'err',
            message: err
        })
    }
}


export const createUserController = async (req, res) => {
    try {

        const { email, password, name } = req.body
        if(email && password && name){
            const response = await createUserService({ email, password, name })
            return res.json(response)
        }else {
            return res.json({
                status: 'err',
                messgae: "The email, password and name is required"
            })
        }
    }catch(e){
        console.log(e)
    }
}

export const loginUserController = async (req, res) => {
    const { email, password } = req.body
    if(email && password){
        const response = await loginUserService({ email, password })
        console.log('456', response.data.refresh_token)
        // const {data : { accesstoken }} = response       
         res.cookie("refresh token", response.data.refresh_token, {
            httpOnly : true,
            secure : false,
            path: "/",
            sameSite: "strict"
        })
        return res.json(response)
    }else {
        return res.json({
            status: 'err',
            message: "The email and password is required"
        })
    }
   
}

export const updateUserController = async (req, res) => {
    try{
        const { id } = req.params
        const data = req.body
        if(id) {
            const response = await updateUserService(id, data)
            if(response){
                return res.json(response)
            }else {
                return res.json({
                    status: 'err',
                    messgae: 'The server is problem'
                })
            }
        }else {
            return res.json({
                status: 'err',
                messgae: 'The id of user is required'
            })
        }
    }catch(e){
        console.log(e)
        return res.json({
            message: e,
            status: 'err'
        })
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const _id = req.params.id
        if(_id){
            const response = await deleteUserService(_id)
            return res.status(200).json(response)
        }else {
            return res.status(404).json({
                status: 'err',
                message: 'The userId is required'
            })
        }
    } catch (error) {
        return res.status(404).json({
            status: 'err',
            message: error
        })
    }
}

export const getAllUserController = async (req, res) => {
    try{
        const response = await getAllUserService()
        return res.status(200).json({
            data: response,
            status: 'OK'
        })
    }catch(e){
        return res.status(400).json({
            message: e,
            status: 'err'
        })
    }
}

export const deleteAllUserController = async(req, res) => {
    const { id } = req.query
    try {
        const response = await deleteAllUserService(id)
        return res.status(200).json({
            data: response,
            status: 'OK'
        })
    } catch (error) {
        return res.status(400).json({
            message: e,
            status: 'err'
        })
    }
}

export const logOutUserController = async (req, res) => {
    res.clearCookie("refresh token");
    res.status(200).json("Logged out successfully!");
  }