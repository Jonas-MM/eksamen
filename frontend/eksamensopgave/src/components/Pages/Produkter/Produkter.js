import React, { useState, useEffect } from "react"

import { Link } from "react-router-dom";

import "./produkter.scss";


function Produkter () {
    const [produkter, setProdukter] = useState([]); 
    const [kategorier, setKategorier] = useState([]);
    const [overskrift, setOverskrift] = useState("Kager");
    const [defaultArr, setDefaultArr] = useState([]);


    const imgPath = "./Images/";

    function fetchData() {
        Promise.all([
            fetch("http://localhost:5033/kategorier").then(value => value.json()),
            fetch("http://localhost:5033/produkter").then(value => value.json())
            ])
            .then((value) => {
               console.log(value)
              setKategorier(value[0]);
              setProdukter(value[1]);
              
              let filtered = value[1];
              filtered = filtered.filter((e) => e.kategori._id === "5f63ba1c702cca37f87ce072");
              setDefaultArr(filtered);


            })
            .catch((err) => {
                console.log(err);
            });
      }
      useEffect(() => {
        fetchData();
        
      }, []);
      console.log(defaultArr);
    //   console.log(kategorier);




      //filter funktion
      function handleFilter(k){

        let filtered = produkter;
        filtered = filtered.filter((e) => e.kategori._id === k.target.value);
        setDefaultArr(filtered);

        // k.currentTarget.style.visibility = 'hidden';
        setOverskrift(k.currentTarget.innerText);
        

        
    }



      const kategoriOutput = kategorier.map((k, i) => {
        return(
            <li key={i}>
                <button className="text-right katBtn" value={k._id} onClick={handleFilter}>{k.titel}</button>
            </li>
        )
      })



      const productOutput = defaultArr.map((card, i) => {
        return(
            <div className="col-lg-4 d-table col-md-6 my-5 d-table-cell" key={i} >
                <img src={imgPath + card.image} alt="" className="img-fluid productImg" />
                <div className="d-flex comment justify-content-center align-items-center mt-3 mb-0">
                    <p className="faded m-0 p-1">{card.kommentar.length}</p>
                    <img className="m-1" src={imgPath + "speech-bubble.png"} alt=""/>
                    <p className="faded m-0 p-1">{card.likes}</p>
                    <img className="m-1" src={imgPath + "heartFilled.png"} alt=""/>
                </div>
                <h5 className="text-center">{card.titel}</h5>
                <p className="text-center faded teaserTxt">{card.teaser}</p>
                <div className="text-center mx-auto ">
                    <button className="mt-4">
                        <Link to={`/${card._id}`} >SE MERE</Link>
                    </button>
                </div>
            </div>
        )
      })

    return ( 
        <div className="container w-lg-50 mt-5" id="produkter">
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h4 className="lobster">Vores elskede bagværk</h4>
                    <p className="faded mx-5 mt-4">Der er mange tilgængelige udgaver af lorem ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud</p>
                </div>
                <ul className="col-lg-4 mt-5">
                    {kategoriOutput}
                </ul>
                <div className="col-lg-8 d-flex flex-wrap d-table">
                    <div className="col-12">
                        <h4>{overskrift}</h4>
                    </div>
                    {productOutput}
                </div>
            </div>
        </div>
        )
}
 
export default Produkter;