async function addStudent(event){
    event.preventDefault();


    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let cgpa = document.getElementById("cgpa").value;
    let branch = document.getElementById("branch").value;

    let student = {
        name:name,
        studentId:id,
        cgpa:cgpa,
        branch:branch
    }

    const response = await fetch("http://localhost:1314/students/add",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(student)
    });

    if(response.ok){
        window.alert(`added: ${student.name}`);
        window.location.href="viewstudents.html";
    }else if(response.status==409){
        window.alert("User Id Already exists");
    }else if(response.status==204){
        window.alert("Username can't be null");
    }else{
        window.alert("Something went wrong");
    }

    event.target.reset();

}


async function getStudents(){
    let table = document.getElementById("table");
    table.innerHTML = '';

    const studentsResponse = await fetch("http://localhost:1314/students/get");
    const students = await studentsResponse.json(); 
    for(student of students){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        
        td1.textContent = student.name;
        td2.textContent = student.studentId;
        td3.textContent = student.cgpa;
        td4.textContent = student.branch;
        
        let edit = document.createElement('a');
        edit.textContent="Edit"
        edit.href="#"
        
        let del = document.createElement('a'); 
        del.textContent="Delete"
        del.href="#"
        
        td5.append(edit," | ", del);
        
        tr.append(td1, td2, td3, td4, td5);
        
        table.appendChild(tr);
        
        
        edit.onclick = function(event){
            event.preventDefault();
            
            localStorage.setItem("studentId", td2.textContent);
            window.location.href="edit.html";
        }
        
        del.onclick = function(event){
            event.preventDefault();
            deleteStudent(td2.textContent);
        }
    }
}

async function deleteStudent(id){
    const response = await fetch(`http://localhost:1314/students/delete?id=${id}`,{
        method:"DELETE"
    })

    if(response.ok){
        window.alert("Deleted successfully");
    }else{
        window.alert("Something went worong");
    }
    getStudents();
    
}



async function load(){
    let studentId = localStorage.getItem("studentId");
    console.log(studentId);
    
    const response = await fetch(`http://localhost:1314/students/getstudent?id=${studentId}`);

    const data = await response.json();
    console.log(data);

    document.getElementById("editname").value=data.name;
    document.getElementById("editid").value=data.studentId;
    document.getElementById("editcgpa").value=data.cgpa;
    document.getElementById("editbranch").value=data.branch;
}




async function edit(event){
    event.preventDefault();

    let ename = document.getElementById("editname").value;
    let eid = document.getElementById("editid").value;
    let ecgpa = document.getElementById("editcgpa").value;
    let ebranch = document.getElementById("editbranch").value;

    let student = {
        studentId:eid,
        name:ename,
        cgpa:ecgpa,
        branch:ebranch
    }

    const response = await fetch("http://localhost:1314/students/save",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(student)
    });

    if(response.ok){
        window.alert("saved successfully");
        window.location.href = "viewstudents.html";
    }else{
        window.alert("something went wrong");
    }
    event.target.reset();
}