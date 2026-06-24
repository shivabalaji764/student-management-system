import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export default function Add(){
    const navigate = useNavigate();

    const [studentId, setStudentId] = useState(0);
    const [name, setName] = useState("");
    const [cgpa, setCgpa] = useState(0.00);
    const [branch, setBranch] = useState("");

    const handleAdd = async function(event){
        event.preventDefault();

        const response = await axios.post("http://localhost:1314/students/add",
            {studentId, name, cgpa, branch});

        if(response.status===200){
            navigate('/view');
        }else{
            alert("Something went wrong");
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
                <form onSubmit={handleAdd}>
                    <h3>Add a new Student</h3>

                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" placeholder="Enter student name" required
                           value={name}
                           onChange={(e)=>setName(e.target.value)}
                           pattern="^[A-Za-z ]{4,}$"
                           title="name must contain \nonly alphabets \natleast 4 characters"
                    />
                    <br/>

                    <label htmlFor="id">ID:</label>
                    <input type="number" name="id" id="id" placeholder="Enter student ID" required
                           title="ID should only contain numbers and exactly 10 characters long"
                           onChange={e=>setStudentId(parseInt(e.target.value))}
                    />
                    <br/>

                    <label htmlFor="number">CGPA:</label>
                    <input type="text" name="cgpa" id="cgpa" placeholder="Enter student CGPA" required
                           pattern="([0-9]\.[0-9]{2}|10\.00)"
                           title="CGPA should be in x.xx format (range = 0.00 to 9.99) or 10.00"
                           onChange={e => setCgpa(parseFloat(e.target.value))}
                    />
                    <br/>

                    <label htmlFor="branch">Branch:</label>
                    <input type="text" name="branch" id="branch" placeholder="Enter student branch" required
                           pattern="[^!@#$%^&*]+"
                           title="No special characters are allowed in branch"
                           value={branch}
                           onChange={e => setBranch(e.target.value)}
                    />
                    <br/>

                    <button type="submit">Add Student</button>
                </form>
            </div>
        </>
    )
}