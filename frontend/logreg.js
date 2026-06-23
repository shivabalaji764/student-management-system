const unameregex = /^[A-Za-z0-9_.]{5,}$/;
const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

async function register(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let mail = document.getElementById("mail").value;

    if(!unameregex.test(name)){
        window.alert("user name must contain at least 5 characters \nand only alphabets, numbers , _ and .");
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
        userName:name,
        password:password,
        email:mail
    }

    const response = await fetch("http://localhost:1314/users/signup",{
        method : 'POST',
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify(user)
    });

    if(response.ok){
        console.log("saved");
        window.location.href = "login.html";
    }else if(response.status==409){
        window.alert("Username already exists");
        event.target.reset();
    }
    else{
        console.log("something went wrong");
        event.target.reset();
    }


}


async function login(event){
    event.preventDefault();


    let name = document.getElementById("name").value;
    let pass = document.getElementById("password").value;
    console.log(name+" "+pass);

    const response = await fetch("http://localhost:1314/users/login",{
        method : 'POST',
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({userName:name, password:pass})
        }
    );
    if(response.ok){
        window.alert("Login successful");
        window.location.href = "dashboard.html";
    }else{
        window.alert("The userId or Password doesn't match");
    }
}