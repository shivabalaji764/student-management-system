import {useNavigate} from "react-router-dom";


export default function Index(){
    const navigate = useNavigate();

    return(
        <>
            <nav>
                <a onClick={e=>navigate("/")}>Home</a>
                <a onClick={e=>navigate("/login")}>Login</a>
                <a onClick={e=>navigate("/register")}>Register</a>
            </nav>

            <h2>Welcome to the Student management System</h2>
            <h4><a onClick={e=>navigate("/login")}>Login</a> or
                <a onClick={e=>navigate("/register")}>Register</a> to get started</h4>
        </>
    )
}