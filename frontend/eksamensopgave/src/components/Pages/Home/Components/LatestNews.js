import React, { useState, useEffect } from "react"


//css
import "../style/latest.scss"

function Latest (){
    const [nyheder, setNyheder] = useState([]);

    const imgPath = "./Images/" 
    
    
    useEffect(() => {

        let API_Call = `http://localhost:5033/nyheder`;
    
        fetch(API_Call)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
              setNyheder(data.slice(0, 3))
          })
          .catch((error) => {
            console.error("Error:", error);
          });

      }, []);
      
    const latestOutout = nyheder.map((nyhed, i) => {
        return(
            <div className="col-lg-4 col-sm-12 col-md-6 text-center my-5" key={i}>
                <img src={imgPath + nyhed.image} alt="" className="img-fluid w-75 rounded-circle mb-4"/>
                <h5 className="font-weight-bold text-uppercase">{nyhed.titel}</h5>
                <p className="text-muted">{nyhed.teaser}</p>
            </div>
        )
    }) 


    return ( 
        <div className="container w-lg-50 my-5" id="latest">
            <div className="row ">
                <div className="col-12">
                    <h4 className="lobster text-center">Vi skaber lækkert! brød</h4>
                </div>
                <div className="col-12">
                    <p className="text-muted text-center mt-4 mb-5 mx-5 px-5 mainP">
                        Der er mange tilgængelige udgaver af lorem ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud
                    </p>
                </div>
                <div className="col-12 d-flex flex-wrap">
                    {latestOutout}
                </div>
            </div>
        </div>
    );
}
 
export default Latest;