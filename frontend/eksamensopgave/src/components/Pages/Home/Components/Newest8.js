import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom";

// import axios from "axios"    

//css
import "../style/newest8.scss"


function Newest8() {
    const [newest, setNewest] = useState([]); 

    const imgPath = "./Images/";


    function fetchData() {
        fetch("http://localhost:5033/produkter/antal/8")
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //   console.log(data)
              setNewest(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      useEffect(() => {
        fetchData();
      }, []);


      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
      var arr = newest;
      shuffle(arr);
    //   console.log(arr);
    //   console.log(newest);


    // console.log(newest)
      const newestOutput = newest.map((card, i) => {
        return(
            <div className="col-lg-3 d-table col-md-6 my-5 d-table-cell" key={i}>
                <img src={imgPath + card.image} alt="" className="img-fluid"/>
                <div className="d-flex comment justify-content-center align-items-center mt-3 mb-0">
                    <p className="faded m-0 p-1">{card.kommentar.length}</p>
                    <img className="m-1" src={imgPath + "speech-bubble.png"} alt=""/>
                </div>
                <h5 className="text-center">{card.titel}</h5>
                <p className="text-center faded teaserTxt">{card.teaser}</p>
                <div className="text-center mx-auto ">
                    <button className="mt-4">
                        <Link to={`/${card._id}`}>SE MERE</Link>
                    </button>
                </div>
            </div>
        )
      })


    return(
        <div className="container w-lg-50 mt-5" id="newest8">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h4 className="lobster">Nyeste bagværk</h4>
                    <p className="faded mx-5 mt-4">Der er mange tilgængelige udgaver af lorem ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud</p>
                </div>
                <div className="col-12 d-flex flex-wrap d-table">
                    {newestOutput}
                </div>
            </div>
        </div>
    )
}

export default Newest8;