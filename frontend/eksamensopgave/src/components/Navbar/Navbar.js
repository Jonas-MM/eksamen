import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { NavLink, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { Row, } from "react-bootstrap";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//css
import "./navbar.scss"
import axios from "axios";



const Header = () => {


        const [searchTerm, setSearchTerm] = useState("");
        const [result, setResult] = useState([]);


        const [loggedin, setLoggedin] = useState(false);

        useEffect(() => {
            let userData = localStorage.getItem("bruger"); 
            userData = JSON.parse(userData); 
            if(userData != null){    
                setLoggedin(userData.data.login_godkendt);
            }
            }, []);

        function handleChange(e) {
            setSearchTerm(e.target.value)

            axios.get(`http://localhost:5033/produkter/soeg/${searchTerm}`)
            .then(function (response) {
                console.log(response);
                setResult(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        function logout(){
            if(window.confirm("Er du sikker på at du vil loggge ud?")){
                localStorage.removeItem("bruger");
                window.location.reload(false);
            }
        }


        const searchResult = result.map((link, i) => {
            return(
                <li key={i}><a href={`/${link._id}`}>{link.titel}</a></li>
            ) 
        })
     
    return(

        <header id="header">
                <nav className="container-fluid navbarCon ">
                <Row>

                    <div className="col-12 px-5">
                        <Navbar id="navbar" bg="none" expand="lg" className="px-0">
                            <Navbar.Brand href="/" id="brand" className="d-lg-none">
                                    <h1>Bageriet</h1>
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mx-auto linksCon">
                                    <div className="row">
                                        <div className="col-lg-12 ulCon">
                                            <ul className="d-flex align-items-center ">
                                                <li>
                                                    <NavLink to="/" className="px-3">FORSIDE</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/produkter" className=" px-3">PRODUKTER</NavLink>
                                                </li>
                                                <Navbar.Brand href="/" id="brand" className="d-none d-lg-block mx-4">
                                                        <h1 >bageriet</h1>
                                                </Navbar.Brand>
                                                <li>
                                                    <NavLink to="/kontakt" className=" px-3">KONTAKT</NavLink>
                                                </li>
                                                <li>
                                                    {loggedin ? 
                                                    (
                                                        <button className="logout-button px-3" onClick={logout}>LOGUD</button>
                                                    )
                                                    :
                                                    (
                                                        <NavLink to="/Login" className=" px-3" >LOGIN</NavLink>
                                                    )
                                                    }
                                                </li>
                                                <li>
                                                    <NavLink to="rediger" className="d-lg-none"> Rediger profil </NavLink>
                                                </li>
                                                <form action="" className="searchForm" >
                                                    <img src="../../Images/searchIcon.png" alt="searchIcon" className="searchIcon"/>
                                                    <input type="text" onChange={handleChange} />
                                                    <ul className="searchUl">
                                                        {searchResult}
                                                    </ul>
                                                </form>
                                            </ul>
                                           
                                        </div>
                                    </div>

                                </Nav>
                                        {loggedin ? 
                                                (
                                                    <NavLink to="/rediger" className="editProfile d-none d-lg-block" >
                                                        <img src="https://img.icons8.com/flat_round/64/000000/settings--v1.png"/>
                                                    </NavLink>
                                                )
                                                :
                                                (
                                                    ""
                                                )
                                                }
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Row>
                </nav>
      </header>
    )
}

export default withRouter(Header);