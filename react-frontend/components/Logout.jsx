import {useNavigate} from "react-router-dom";


export default function Logout(){
    const navigate = useNavigate();

    return(
        <>
            <h2>You've successfully logged out</h2>
            <h4><a onClick={e=>navigate("/login")}>click here</a> to login again</h4>
        </>
    );
}