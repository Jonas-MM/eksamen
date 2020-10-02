import React from "react"

import "./style/home.scss"


//Home components
import Latest from "./Components/LatestNews";



import {Carousel} from "react-bootstrap"
import Nyhedsbrev from "./Components/Nyhedsbrev";
import Newest8 from "./Components/Newest8";


const Home = () => {
    const imgpath = "./Images/"
    const slides = ["slide1.jpg", "slide2.jpg", "slide3.jpg"]

    const sliderOutput = slides.map((slide, i) => {
        return( 
            <Carousel.Item key={i} id="carouselCon">
                <img
                className="d-block w-100"
                src={imgpath + slide}
                alt={i + "slide"}
                />
                <div className="sliderContent">
                    <h3 className="lobster text-white">Vi elsker at lave brød</h3>
                </div>
            </Carousel.Item>
        )
    })

    return ( 
        <div className="container-fuild" id="Home">
            <Carousel className="pb-5">
                {sliderOutput}
            </Carousel>
            <Latest />
            <Nyhedsbrev />
            <Newest8 />
        </div>
    );
}
 
export default Home;