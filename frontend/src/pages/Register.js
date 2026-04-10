import React, { useState } from "react";

function Register(){

const [message, setMessage] = useState("");

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  
  fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      if(data.token){
        localStorage.setItem("token", data.token);
        setMessage("✅ Account Created Successfully! Logging you in...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage("❌ " + (data.message || "Registration failed"));
      }
    })
    .catch(err => {
      console.log(err);
      setMessage("❌ Network error");
    });
};

return(

<div className="auth-container">

<div className="auth-box">

<h2>Create Account</h2>

<form onSubmit={handleSubmit}>

<input type="text" placeholder="Full Name" required value={name} onChange={(e)=>setName(e.target.value)} />

<input type="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />

<input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />

<button type="submit">Register</button>

</form>

{message && <p className="success-msg">{message}</p>}

</div>

</div>

)

}

export default Register;