
// signup the user
document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    //register variables
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //user fetch to call register the user
    fetch("./api/admin/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //the body
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
        if (data.message === "Registration successful") {
            window.location.href = "login.html";
        }
    })
    .catch(
        err => console.error(err)
    )


});
