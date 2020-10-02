import React, { useState } from "react"
import { Link } from "react-router-dom";


//scss 
import "./login.scss";


import axios from "axios";


function Register () {
    const [bruger, setBruger] = useState({});
    const [message, setMessage] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': bruger._id
          }
          
        axios.post("http://localhost:5033/bruger", bruger, {

            headers: headers
        })
        .then(res =>{
            console.log(res)
            setMessage("Velkommen i klubben!!")
        })
        .then(function(data){ 
            console.log(data)

        }).catch((err) => {
            console.log(err);
            setMessage("Noget gik galt, prøv igen")

        });
        
        
    } 

    return ( 
        <div className="container-fuild d-flex">
            <div className="main mx-auto w-lg-25">
                <div className="col-lg-12 col-sm-12 mx-auto">
                    <h5>
                        {message}
                    </h5>
                    <div className="register-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group d-flex">
                                <div className="col-lg-6 pl-0">
                                    <label>Fornavn</label>
                                    <input type="text" className="form-control" required onChange={(e) => setBruger({ ...bruger, fornavn: e.target.value })}/>
                                </div>
                                <div className="col-lg-6 pr-0">
                                    <label>Efternavn</label>
                                    <input type="text" className="form-control" required onChange={(e) => setBruger({ ...bruger, efternavn: e.target.value })}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Brugernavn</label>
                                <input type="text" className="form-control" required onChange={(e) => setBruger({ ...bruger, brugernavn: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" required onChange={(e) => setBruger({ ...bruger, email: e.target.value })}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" required onChange={(e) => setBruger({ ...bruger, password: e.target.value })}/>
                            </div>
                            <button type="submit" className="btn btn-black w-100 mb-2">Opret bruger</button>
                        </form> 
                        <Link to="/login">Eller Login her</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;