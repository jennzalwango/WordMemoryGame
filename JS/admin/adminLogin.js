
function loginUser(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //use the fetch api call
    fetch("./api/admin/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // the body is converted in a JSON string
        body: JSON.stringify({
            username:username,
            password: password
        })
    })
    .then(res => res.json()) //the response in a json format, and the data
    .then(data =>{
        document.getElementById("message").innerText = data.message;
        if(data.message === "Login successful"){
            //redirect the suer to the admin page
            window.location.href="admin.html"
        }
    })
    .catch(err => console.error(err));
}
