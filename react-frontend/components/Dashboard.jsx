import {useNavigate} from "react-router-dom";


export default function Dashboard(){
    const navigate = useNavigate();
    return(
        <>
            <nav>
                <a onClick={()=>navigate("/dashboard")}>Dashboard</a>
                <a onClick={()=>navigate("/add")}>Add Student</a>
                <a onClick={()=>navigate("/view")}> View Students</a>
                <a onClick={()=>navigate("/logout")}>Logout</a>
            </nav>
            <br/>
            <h2>Welcome to Student Management System Dashboard</h2>
            <h4><a onClick={()=>navigate('/add')}>click here</a> to add a new student</h4>
            <h4><a onClick={()=>navigate('/view')}>click here</a> to view all students</h4>
        </>
    )
}