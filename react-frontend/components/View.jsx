import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export default function View(){
    const navigate = useNavigate()

    const [students, setStudents] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: null, direction: 0});
    const [search, setSearch] = useState("");

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
        try{
        await axios.delete(`http://localhost:1314/students/delete?id=${id}`);
        setStudents(prevStudents =>
            prevStudents.filter((student) => student.studentId !== id)
        );
        }catch(error){
            console.log("something went wrong")
        }
    }

    const handleSort = (key)=>{
        setSortConfig(prev=>{
            const sameKey = prev.key===key;
            const direction = sameKey?(prev.direction+1)%3:1;

            return {key:key, direction:direction};
        });
    };

    const filteredStudents = students.filter(student=>{
        return student.name.toLowerCase().includes(search.toLowerCase());
    });

    const sortedStudents = [...filteredStudents].sort((a, b)=>{
        const {key, direction} = sortConfig;
        if(direction===0) return 0;

        const multiplier = direction===1?1:-1;
        if(key==='name') return multiplier*a.name.localeCompare(b.name);

        return multiplier*(a[key]-b[key]);
    });

    const getArrow = function (key){
        if(sortConfig.key!==key || sortConfig.direction===0) return "";
        return sortConfig.direction===1?" ↑":" ↓";
    }

    return(
        <>
            <nav>
                <a onClick={()=>navigate("/dashboard")}>Dashboard</a>
                <a onClick={()=>navigate("/add")}>Add Student</a>
                <a onClick={()=>navigate("/view")}> View Students</a>
                <a onClick={()=>navigate("/logout")}>Logout</a>
            </nav>
            <br/>


            <div className="table">
                <h3>Students Details</h3>
                {students.length>0?
                    <div>
                        <div className={"search"}>
                            <label htmlFor={"input"}><h4>Search</h4></label>
                            <input type={"text"} placeholder={"search here"} id={"input"}
                                   value={search}
                                   onChange={(e)=>setSearch(e.target.value)}
                            />
                        </div>
                        <div className="sort">
                            <h4>Sort By</h4>
                            <button onClick={()=>handleSort('name')}>Name{getArrow('name')}</button>
                            <button onClick={()=>handleSort('studentId')}>ID{getArrow('studentId')}</button>
                            <button onClick={()=>handleSort('cgpa')}>CGPA{getArrow('cgpa')}</button>
                        </div>
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
                                {sortedStudents.map(student=>(
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
                    :<p style={{color:"red"}}>- - - No Content - - -</p>}
            </div>
        </>
    )
}