function logout() {
    fetch('./api/admin/logOut.php', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
        // redirect to login after logout
        window.location.href = 'login.html';
    })
    .catch(function() {
        document.getElementById("message").innerText = "Logout failed.";
    });
}