import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import "./register.css";
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('register')
        const newUser = {
            email: email,
            password: password,
            name: name
        }
        registerUser(newUser,dispatch,navigate)
    }
    return ( 
        <section className="register-container">
              <div className="register-title"> Sign up </div>
            <form>
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" onChange={(e) => setName(e.target.value)} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={handleRegister}> Create account </button>
            </form>
        </section>
        
     );
}
 
export default Register;