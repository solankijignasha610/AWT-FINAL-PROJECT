import React, { useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

function Login(){

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [celebrate, setCelebrate] = useState(false);

const handleLogin = () => {

  fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if(data.token){
        localStorage.setItem("token", data.token);
        setMessage("🎉 Login Successful!");
        setCelebrate(true);
        setTimeout(() => {
          setCelebrate(false);
          window.location.href = "/"; // Redirect mostly after login
        }, 3000);
      } else {
        setMessage("❌ " + (data.message || "Invalid credentials"));
      }
    })
    .catch(err => {
      console.log(err);
      setMessage("❌ Network Error");
    });
};

return(

<div className="auth-container">

{celebrate && (
<Confetti
width={window.innerWidth}
height={window.innerHeight}
numberOfPieces={200}
recycle={false}
/>
)}

<div className="auth-box">

<h2>Login</h2>

<input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

<input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

<button onClick={handleLogin}>Login</button>

<p style={{ marginTop: "15px" }}>
  Don't have an account? <Link to="/register" style={{ color: "#ff4da6", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
</p>

{message && <p className="success-msg">{message}</p>}

</div>

</div>

)

}

export default Login;