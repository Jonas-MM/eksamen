import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Row, } from "react-bootstrap";


//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//css
import "./navbar.css"


function Header() {

    return(

        <header>
                <nav className="container-fluid navbarCon ">
                <Row>
                    <div className="col-12">
                        <Navbar id="navbar" bg="none" expand="lg" className="px-0">
                        <Navbar.Brand href="/" id="brand">
                            <NavLink to="/">
                                <h1 className="text-dark px-3">Eksamensopgave</h1>
                            </NavLink>                    
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto linksCon">
                                    <ul className="d-flex">
                                        <li>
                                            <NavLink to="/side1" className="text-dark px-3">Side1</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/side2" className="text-dark px-3">Side2</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/side3" className="text-dark px-3">Side3</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/side4" className="text-dark px-3">Side4</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/side5" className="text-dark px-3">Side5</NavLink>
                                        </li>
                                    </ul>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Row>
                <hr />
                </nav>
      </header>
    )
}

export default withRouter(Header);