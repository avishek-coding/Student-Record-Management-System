import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDce-_byR5xrIM8MfslTeDvkESJb2M47e0",
  authDomain: "student-record-75278.firebaseapp.com",
  projectId: "student-record-75278",
  storageBucket: "student-record-75278.appspot.com",
  messagingSenderId: "105083847190",
  appId: "1:105083847190:web:0cb3b08d0ce77008c2ab37"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
document.querySelector('.login .submit').addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.querySelector('.login .mail').value;
    const password = document.querySelector('.login .password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        window.location.href = "home.html";
    })
    .catch((error) => {
        alert(error.message);
    });
});

// SIGNUP - FIXED VERSION
document.querySelector('.signup .submit').addEventListener("click", (e) => {
    e.preventDefault();

    // Fixed: Use querySelector to get the email and password from signup form
    const email = document.querySelector('.signup .mail').value;
    const password = document.querySelector('.signup .password').value;
    
    // Optional: Get additional signup fields
    const fullName = document.querySelector('.signup input[name="username"]').value;
    const regNo = document.querySelector('.signup input[name="reg"]').value;
    const rollNo = document.querySelector('.signup input[name="roll"]').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        alert("Account created successfully!");
        // Optionally clear the form
        document.querySelector('.signup form').reset();
        // Optionally switch to login form after signup
        document.getElementById('toggle').checked = false;
    })
    .catch((error) => {
        alert(error.message);
    });
});