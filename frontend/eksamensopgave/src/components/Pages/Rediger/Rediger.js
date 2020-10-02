import React, {useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from 'react-router-dom';

function Rediger () {
    const [bruger, setBruger] = useState({})
    const [message, setMessage] = useState("")

    const history = useHistory();


    useEffect(() => {
        // fetchData();
        let userData = localStorage.getItem("bruger"); 
        userData = JSON.parse(userData); 
        // console.log(userData)
        if(userData != null){    
            // setLoggedin(userData.data.login_godkendt);
            setBruger(userData.data);
        }
        }, []);
        console.log(bruger);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': bruger._id
        }

        function sletBruger(){
            if(window.confirm("Er du sikker på at du vil slette denne profil")){


                axios.delete(`http://localhost:5033/bruger/admin/${bruger.bruger_id}`, bruger, {

                    headers: headers
                })
                .then(res =>{
                    console.log(res)
                    setMessage("Din profil er nu slettet")
                    localStorage.removeItem("bruger");
                    history.push('/produkter')
                })
                .then(function(data){ 
                    console.log(data)
        
                }).catch((err) => {
                    console.log(err);
                    setMessage("Noget gik galt, prøv igen")
        
                });
            }
        }

        function redigerBruger(){
            axios.put(`http://localhost:5033/bruger/admin/${bruger.bruger_id}`, bruger, {

                    headers: headers
                })
                .then(res =>{
                    console.log(res)
                    setMessage("Din profil er nu rettet")
                    window.localStorage.setItem("bruger", bruger);
                })
                .then(function(data){ 
                    console.log(data)
        
                }).catch((err) => {
                    console.log(err);
                    setMessage("Noget gik galt, prøv igen")
        
                });
        }


    return(
        <div className="container-fuild d-flex">
            <div className="main mx-auto">
                <h4>Rediger din profil</h4>
                <h4>{message}</h4>
                <form action="PUT">
                        <div className="form-group d-flex">
                            <div className="col-6 pl-0">
                                <label>Fornavn</label>
                                <input type="text" className="form-control" defaultValue={bruger.fornavn} onChange={(e) => setBruger({ ...bruger, fornavn: e.target.value })}/>
                            </div>
                                <div className="col-6 pr-0">
                                <label>Efternavn</label>
                            <input type="text" className="form-control" defaultValue={bruger.efternavn} onChange={(e) => setBruger({ ...bruger, efternavn: e.target.value })}/>
                            </div>
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label>brugernavn</label>
                            <input type="text" className="form-control" defaultValue={bruger.brugernavn} onChange={(e) => setBruger({ ...bruger, brugernavn: e.target.value })}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" defaultValue={bruger.email} onChange={(e) => setBruger({ ...bruger, email: e.target.value })}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="password" className="form-control" placeholder="password" onChange={(e) => setBruger({ ...bruger, password: e.target.value })}/>
                        </div>
                        <div className="form-group d-flex">
                            <div className="col-6 w-100 pl-0">
                                <button onClick={redigerBruger} className="w-100">Rediger</button>
                            </div>
                            <div className="col-6 w-100 pr-0">
                                <button onClick={sletBruger} className="w-100">Slet</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    )
}
export default Rediger;