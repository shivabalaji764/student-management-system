import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export default function View(){
    const navigate = useNavigate()

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudents = async ()=>{
            try {
                const response = await axios.get("http://localhost:1314/students/get");
                setStudents(response.data);
            }catch (e){
                console.log(e);
            }
        };
        void getStudents();
    }, []);

    const handleDelete = async (id)=>{
        const response = await axios.delete(`http://localhost:1314/students/delete?id=${id}`);

        if(response.status===200){
            setStudents(prevStudents =>
                prevStudents.filter((student) => student.studentId !== id)
            );
        }else{
            console.log("something went wrong")
        }
    }

    return(
        <>
            <nav>
                <a onClick={e=>navigate("/dashboard")}>Dashboard</a>
                <a onClick={e=>navigate("/add")}>Add Student</a>
                <a onClick={e=>navigate("/view")}> View Students</a>
                <a onClick={e=>navigate("/logout")}>Logout</a>
            </nav>
            <br/>

            <div className="table">
                <h3>Students Details</h3>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>CGPA</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {students.map(student=>(
                           <tr key={student.studentId}>
                               <td>{student.name}</td>
                               <td>{student.studentId}</td>
                               <td>{student.cgpa}</td>
                               <td>{student.branch}</td>
                               <td><a onClick={()=>navigate(`/edit?id=${student.studentId}`)}>Edit</a> |
                                   <a onClick={()=>handleDelete(student.studentId)}>Delete</a></td>
                           </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}