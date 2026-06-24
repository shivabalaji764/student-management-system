import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Register(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = async (event)=>{
        event.preventDefault();

        try{
            await axios.post('http://localhost:1314/users/signup',
            {userName, password, email});
            navigate("/login");
        }catch(error){
            if(error.status===409){
                alert("username is already taken");
            }else{
                alert("Something went wrong");
            }
        }
    }

    return(
        <>
            <nav>
                <a onClick={()=>navigate("/")}>Home</a>
                <a onClick={()=>navigate("/login")}>Login</a>
                <a onClick={()=>navigate("/register")}>Register</a>
            </nav>
            <br/>
            <div className="form">
                <form onSubmit={handleRegister}>
                    <h3>Register here</h3>

                    <label htmlFor="name">User Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter User Name" required
                           value={userName}
                           onChange={e=>setUserName(e.target.value)}
                    />
                    <br/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Enter Password" required
                           value={password}
                           onChange={e=>setPassword(e.target.value)}
                    />
                    <br/>

                    <label htmlFor="cpassword">Confirm Password:</label>
                    <input type="password" name="cpassword" id="cpassword" placeholder="confirm Password" required
                           value={retypedPassword}
                           onChange={e=>setRetypedPassword(e.target.value)}
                    />
                    <br/>

                    <label htmlFor="mail">Email:</label>
                    <input type="email" name="mail" id="mail" placeholder="Enter Email" required
                           value={email}
                           onChange={e=>setEmail(e.target.value)}
                    />
                    <br/>

                    <button type="submit">Register</button>
                    <p> already had an account? <a onClick={()=>navigate("/login")}>Login</a> here</p>
                </form>
            </div>
        </>
    )
}