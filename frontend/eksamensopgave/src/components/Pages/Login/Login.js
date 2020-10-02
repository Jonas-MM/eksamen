import React, { useState } from "react"
import { Link } from "react-router-dom";


//scss 
import "./login.scss";


import axios from "axios";


function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    const [bruger, setBruger] = useState({});

    // console.log(bruger)
    
    const [message, setMessage] = useState("");



    function handleSubmit(e){
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': bruger._id
          }
          
        var data = {
            "email": email,
            "password": password
        }
        
        axios.post("http://localhost:5033/login/login", data, {

            headers: headers
        })
        .then(res =>{
            console.log(res)
            setMessage("Du er nu logget ind")
            localStorage.setItem("bruger", JSON.stringify(res));
            document.cookie = JSON.stringify(res);
        })
        .then(function(data){ 
            console.log(data)

        }).catch((err) => {
            console.log(err);
            setMessage("Ugyldig login")

        });
        
        
    } 
    // function console(){

    // }
    // console.log(localStorage.getItem("bruger"))
    return ( 
        <div className="container-fuild d-flex">
            <div className="main mx-auto">
                <div className="col-md-12 col-sm-12 mx-auto">
                    <h5>
                        {message}
                    </h5>
                    <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="User Name" defaultValue="peter@bager.d" onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" defaultValue="admin12" onChange={e => setPassword(e.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-black w-100 mb-2">Login</button>
                    </form> 
                        <Link to="/register">Eller registrer dig her</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;