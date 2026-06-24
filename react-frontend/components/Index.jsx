import {useNavigate} from "react-router-dom";


export default function Index(){
    const navigate = useNavigate();

    return(
        <>
            <nav>
                <a onClick={()=>navigate("/")}>Home</a>
                <a onClick={()=>navigate("/login")}>Login</a>
                <a onClick={()=>navigate("/register")}>Register</a>
            </nav>

            <h2>Welcome to the Student management System</h2>
            <h4><a onClick={()=>navigate("/login")}>Login</a> or
                <a onClick={()=>navigate("/register")}> Register</a> to get started</h4>
        </>
    )
}