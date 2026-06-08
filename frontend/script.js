function addStudent(event){
    event.preventDefault();

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let cgpa = document.getElementById("cgpa").value;
    let branch = document.getElementById("branch").value;

    let student = {
        name:name,
        id:id,
        cgpa:cgpa,
        branch:branch
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    event.target.reset();

    window.location.href="viewstudents.html";
}


function getStudents(){
    let table = document.getElementById("table");
    table.innerHTML = '';

    students = JSON.parse(localStorage.getItem("students")) || [];

    for(student of students){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        td1.textContent = student.name;
        td2.textContent = student.id;
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
            localStorage.setItem("id", student.id);
            localStorage.setItem("name", student.name);
            localStorage.setItem("cgpa", student.cgpa);
            localStorage.setItem("branch", student.branch);
            
            window.location.href="edit.html";
        }

        del.onclick = function(event){
            event.preventDefault();
            deleteStudent(student.id);
        }
    }
}

function deleteStudent(id){
    students = JSON.parse(localStorage.getItem("students")) || [];

    let idx = students.findIndex(student=>student.id==id);

    if(idx==-1) return;

    students.splice(idx, 1);

    localStorage.setItem("students", JSON.stringify(students));

    getStudents();
}

let id = -1

function load(){
    id = localStorage.getItem("id");
    let name = localStorage.getItem("name");
    let cgpa = localStorage.getItem("cgpa");
    let branch = localStorage.getItem("branch");

    document.getElementById("editname").value=name;
    document.getElementById("editid").value=id;
    document.getElementById("editcgpa").value=cgpa;
    document.getElementById("editbranch").value=branch;

    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("cgpa");
    localStorage.removeItem("branch");
}




function edit(event){
    event.preventDefault();

    if(id==-1){
        alert("Something went wrong");
    }else{
        let students = JSON.parse(localStorage.getItem("students")) || []

        let ename = document.getElementById("editname").value;
        let eid = document.getElementById("editid").value;
        let ecgpa = document.getElementById("editcgpa").value;
        let ebranch = document.getElementById("editbranch").value;


        for(student of students){
            if(student.id == id){
                student.name = ename;
                student.id = eid;
                student.cgpa = ecgpa;
                student.branch = ebranch;
                break;
            }
        }

        localStorage.setItem("students", JSON.stringify(students));


        window.location.href = "viewstudents.html";
    }
}