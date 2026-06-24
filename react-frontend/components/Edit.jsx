import {useNavigate, useSearchParams} from "react-router-dom"
import {useEffect, useState} from "react";
import axios from "axios";

export default function Edit(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [studentId, setStudentId] = useState(0);
    const [cgpa, setCgpa] = useState(0.00);
    const [branch, setBranch] = useState("");

    useEffect(() => {
        const getStudent = async ()=>{
            const response = await axios.get(`http://localhost:1314/students/getstudent?id=${id}`);
            const data = response.data;
            setStudentId(data.studentId);
            setName(data.name);
            setCgpa(data.cgpa);
            setBranch(data.branch);
        }
        void getStudent();
    }, []);

    const handleEdit = async function(event){
        event.preventDefault();
        const student={
            name, studentId, cgpa, branch
        };

        const response = await axios.patch("http://localhost:1314/students/save", student);

        if(response.status===200){
            navigate('/view');
        }else{
            alert("something went wrong");
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

            <div className="form">
                <form onSubmit={handleEdit}>
                    <h3>Edit student</h3>

                    <label htmlFor="id">Id:</label>
                    <input type="text" name="id" id="id" placeholder="Enter student id" disabled={true}
                           value={studentId}
                    />
                    <br/>

                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="editname" placeholder="Enter student name" required
                           value={name}
                           onChange={e=>setName(e.target.value)}
                    />
                    <br/>

                    <label htmlFor="cgpa">CGPA:</label>
                    <input type="number" name="cgpa" id="editcgpa" placeholder="Enter student CGPA" required
                           value={cgpa}
                           onChange={e=>setCgpa(parseFloat(e.target.value))}
                    />
                    <br/>

                    <label htmlFor="branch">Branch:</label>
                    <input type="text" name="branch" id="editbranch" placeholder="Enter student branch" required
                           value={branch}
                           onChange={e=>setBranch(e.target.value)}
                    />
                    <br/>

                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    )
}