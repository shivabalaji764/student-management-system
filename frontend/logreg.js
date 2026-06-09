const unameregex = /^[A-Za-z0-9_.]{5,}$/;
const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

function register(event){
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || []

    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let mail = document.getElementById("mail").value;

    if(!unameregex.test(name)){
        window.alert("user name must contain atlest 5 characters \nand only alphabets, numbers , _ and .");
        event.target.reset();
        return;
    }
    
    if(!passwordregex.test(password)){
        window.alert("Password must contain \nAn uppercase alphabet \nA lowercase alphabet \nA special character \nA number \n8 Characters long");
        event.target.reset();
        return;
    }

    if(password!==cpassword){
        console.log(password+" "+cpassword);
        alert("passwords doesn't match");
        event.target.reset();
        return;
    }

    let user = {
        name:name,
        password:password,
        mail:mail
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    event.target.reset();

    window.location.href = "login.html";
}


function login(event){
    event.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    console.log(users);

    let name = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;

    for(user of users){
        if(user.name===name && user.password===pass){
            window.alert("login successful");
            window.location.href="dashboard.html";
            return;
        }
    }

    window.alert("The userId or Password doesn't match");
    // event.target.reset();
}