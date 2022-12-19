import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const newUser = {
        email : email,
        password : password
    }
    const handleLogin = (e) => {
        e.preventDefault();

        loginUser(newUser, dispatch, navigate)
    }

    return ( 
        <section className="login-container">
            <div className="login-title"> Log in</div>
            <form>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" onChange={(e) => setEmail(e.target.value)} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={handleLogin}> Continue </button>
            </form>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Register one for free </Link>
        </section>
     );
}
 
export default Login;