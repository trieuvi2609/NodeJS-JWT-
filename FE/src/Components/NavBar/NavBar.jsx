import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";
import "./navbar.css";
const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [userName,setUSerName] = useState();
  const user = useSelector((state) => state.auth.login.currentUser)
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
    sessionStorage.clear()
  }
  // setUSerName(user)
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        {/* <p className="navbar-user">Hi, <span> {user.data.data.email}  </span> </p> */}
        <Link className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
