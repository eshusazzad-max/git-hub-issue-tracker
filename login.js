const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")

loginBtn.onclick = () => {

const username = usernameInput.value
const password = passwordInput.value

if(username === "admin" && password === "admin123"){

localStorage.setItem("isLoggedIn", true)

window.location.href = "index.html"

}
else{

alert("Invalid credentials")

}

}