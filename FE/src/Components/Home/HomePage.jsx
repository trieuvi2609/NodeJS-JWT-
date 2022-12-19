import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";
import AutoLagoutTimer from "../AutoLogoutTimer/AutoLagoutTimer ";

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth.login.currentUser)
  const listUser = useSelector((state) => state.user.users.allUsers)
  const userData = listUser?.data.data
  console.log('userData', userData)
  let axiosJWT = axios.create();
  console.log('listUsers', listUser)
  const refreshToken = async () => {
    try {
      const res = await axios.post("/user/refreshToken", {
        withCrendentials: true,
      });
      return res.data
    }
    catch(err) {
      return err
    }
  } 
  //DUMMY DATA
  
  axiosJWT.interceptors.request.use(
    async(config) => {
      let date= new Date()
      const decodedToken = jwtDecode(user?.data.access_token)
      if (decodedToken.exp < date.getTime()/1000){
        const data = await refreshToken();
        const refreshUser = {
          ...user.data, 
          access_token: data.access_token 
        }
        dispatch(loginSuccess(refreshUser))
        config.headers["token"] = "Bearer " + data.access_token;
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
    )
    useEffect(() => {
      if (user && user.data && user.data.access_token){
        getAllUsers(user.data.access_token, dispatch, axiosJWT)
      }
    }, [])
    
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userData?.map((user) => {
          return (
            <div className="user-container">
              <AutoLagoutTimer />
              <div className="home-user">{user.email}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
