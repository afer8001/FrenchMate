function signup(){

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(
        username === "" ||
        password === ""
    ){
        alert("Fill all fields");
        return;
    }

    localStorage.setItem(
        "fm_username",
        username
    );

    localStorage.setItem(
        "fm_password",
        password
    );

    alert("Account Created");

    window.location.href =
    "index.html";

}


function login(){

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    const savedUser =
    localStorage.getItem(
        "fm_username"
    );

    const savedPass =
    localStorage.getItem(
        "fm_password"
    );

    if(
        username === savedUser &&
        password === savedPass
    ){

        localStorage.setItem(
            "fm_logged",
            "true"
        );

        window.location.href =
        "dashboard.html";

    }
    else{

        alert(
            "Wrong Username Or Password"
        );

    }

}


if(
window.location.pathname.includes(
"dashboard"
)
){

    const user =
    localStorage.getItem(
        "fm_username"
    );

    document.getElementById(
        "welcome"
    ).textContent =
    "Welcome " + user;

}

if(document.querySelector(".bg-shapes")){

const shapes =
document.querySelectorAll(".shape");

shapes.forEach(shape=>{

const size =
20 + Math.random()*80;

shape.style.width =
size + "px";

shape.style.height =
size + "px";

shape.style.left =
Math.random()*100 + "%";

shape.style.animationDuration =
10 + Math.random()*20 + "s";

shape.style.animationDelay =
Math.random()*10 + "s";

});

}
