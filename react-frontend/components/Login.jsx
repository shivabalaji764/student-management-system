
import "../styles/style.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function Login(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const login = async function (event){
        event.preventDefault();

        const response = await axios.post("http://localhost:1314/users/login", {userName:name, password:password});

        if(response.status===200){
            navigate('/dashboard');
        }else{
            alert("login failed");
        }
    }

    return(
        <>
            <nav>
                <a onClick={e=>navigate("/")}>Home</a>
                <a onClick={e=>navigate("/login")}>Login</a>
                <a onClick={e=>navigate("/register")}>Register</a>
            </nav>
            <br/>
            <div className="form">
                <form>
                    <h3>Login here</h3>
                    <label htmlFor="name">User Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter User Name"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <br/>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <br/>
                    <button type="submit" onClick={login}>Login</button>
                    <p> New to our site? <a onClick={()=>{navigate("/register")}}>Register</a> here</p>
                </form>
            </div>
        </>
    )
}