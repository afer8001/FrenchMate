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
