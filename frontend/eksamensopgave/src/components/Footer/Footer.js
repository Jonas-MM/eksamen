import React, { Component } from 'react'
import { Link } from "react-router-dom";

import "./footer.scss"

function Footer () {

    return (
        <footer className="container-fluid footer ">
            <div className="row">
            <a href="#header" className="arrowToTop">
                <img src="https://img.icons8.com/android/48/000000/expand-arrow.png"/>
            </a>
            </div>
            <div className="row">
                <div className="col-lg-6 text-center pt-4 mb-3 mx-auto">
                    <h4 className="lobster">Bageriet</h4>
                    <p className="faded mx-lg-5 mt-4">Der er mange tilgængelige udgaver af lorem ipsum, men de fleste udgaver har gennemgået forandringer</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 pb-1 mx-0 px-0 text-center text-muted copyright ">
                    <div className="col-lg-6 text-center py-2 mx-auto">
                        <span >Copyright &copy; 2017 Bageriet aps.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
