import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom";

import axios from "axios";

//css
import "./specificProduct.scss"

//for pagination
import Comments from './Comments';
import Pagination from '../../Pagination/Pagination';


//components
import Navbar from "../../Navbar/Navbar";


import $ from "jquery";


const SpecificProduct = (props) => {
    const ID = props.match.params.id;

    const [product, setProduct] = useState([]);
    const [kategori, setKategori] = useState("");
    const [ingredienser, setIngredienser] = useState([]);
    const [liked, setLiked] = useState(false);

    
    const [likes, setLikes] = useState("");


    const [bruger, setBruger] = useState({});
    const [loggedin, setLoggedin] = useState(false);


    //for axios POST(comment)
    const [kommentarPOST, setKommentarPOST] = useState({});
    let commentPostData = {
        titel: kommentarPOST.titel,
        kommentaren: kommentarPOST.kommentaren,
        bruger: bruger.bruger_id,
        produkt: product._id
    }



    //amount of comments
    const [length, setLength] = useState();

    //for pagination (comments) ////////////
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(3);

    // Get current Comments
        const indexOfLastComment = currentPage * commentsPerPage;
        const indexOfFirstComment = indexOfLastComment - commentsPerPage;
        const currentComments= comments.slice(indexOfFirstComment, indexOfLastComment);

    // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);

    /////////////







    const imgpath = "./Images/"

    let API_Call = `http://localhost:5033/produkter/` + ID;
    

    
    
       
      useEffect(() => {
        fetchData();
        let userData = localStorage.getItem("bruger"); 
        userData = JSON.parse(userData); 
        // console.log(userData)
        if(userData != null){    
            setLoggedin(userData.data.login_godkendt);
            setBruger(userData.data);
        }
        }, [product._id]);


        // console.log(product)
        function fetchData(){
            setLoading(true);

            fetch(API_Call)
            .then(function (response) {
            return response.json();
            })
            .then(function (data) {
            setProduct(data)
            setKategori(data.kategori)
            // setKommentar(data.kommentar);

            setComments(data.kommentar);
            setLoading(false);


            setIngredienser(data.ingredienser)
            setLength(data.kommentar.length)
            setLikes(data.likes)
            })
            .catch((error) => {
            console.error("Error:", error);
            });
         }

      

        // console.log(length);       
        // console.log(likes);
        // console.log(product);
        // console.log(kommentar);
        // console.log(ingredienser);
        // console.log(kategori);
        console.log(comments);


    const ingredienserOutput = ingredienser.map((item, i) => {
        return(
                <div className="col-12 text-center ingrediensBox ">
                    <li className="faded">{item.maengde} <span>{item.enhed_forkortet} </span> <span> { item.ingrediens_titel } </span></li>
                </div>
        )
    })



    // like btn hover function
    function handleHoverEnter(){
        $(".likeBtn").html(likes + " Likes");
    }
    function handleHoverLeave(){
        if (liked){
            $(".likeBtn").html("Like " + '<img src="../../../Images/heartFilled.png" alt="" class="heartImg my-auto"/>');
        } else {
            $(".likeBtn").html("Like " + '<img src="../../../Images/heart.png" alt="" class="heartImg my-auto"/>');
        }
    }

    function handleLike(e){
    
        if(liked === false){
            e.preventDefault();
            axios
            .patch(`http://localhost:5033/produkter/likes/` + ID)
            .then((res) => {
                console.log(res.data);
                setLiked(!liked);
                setLikes(res.data.antal_likes);
                $(".likeBtn").html("Like " + '<img src="../../../Images/heartFilled.png" alt="" class="heartImg my-auto"/>');
            })
            .catch((error) => {
                console.log(error);
            });
        }



    }
    // console.log(commentPostData);


    //post kommentar
    function handleSubmit(e){

        e.preventDefault();

        axios.post("http://localhost:5033/kommentar/admin", commentPostData )
        .then(function (response) {
            console.log(response);
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
        });
        

    }



    // console.log(comments)



    return ( 
        <div className="container px-5 w-lg-50" id="specificProduct">
            <div className="col-12 d-flex p-2 pl-4 my-4 history align-items-center">
                <Link to="/produkter" className="faded p-1">Produkter</Link> <p className="faded p-1 text-dark my-auto">{ "> " + product.titel}</p>
            </div>

            <div className="row">
                <div className="col-12 d-flex justify-content-between">
                    <div>
                        <h3>{product.titel}</h3>
                        <h5 className="text-muted">{kategori.titel}</h5>
                    </div>
                    <div>
                        <button onClick={handleLike} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} className="likeBtn">LIKE <img src={imgpath + "heart.png"} alt="" className="heartImg my-auto"/></button>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-lg-8 d-block">
                    <div className="col-lg-4 productimage pl-0">
                        <img src={imgpath + product.image} alt="productimage"/>
                    </div>
                    <p className="beskrivelse">{product.beskrivelse}</p>
                </div>
                <div className="col-lg-4">
                    <div className="col-12 m-0 p-0 text-left mb-4">
                        <h5>Ingredienser</h5>
                    </div>
                    <ul className="p-0 m-0">
                        {ingredienserOutput}
                    </ul>
                </div>
            </div>
            <div className="kommentarCon">
                
                <div className="col-lg-12 d-flex justify-content-between p-3 px-4 my-2 history ">
                    <h6 className="my-auto">Kommentar</h6>
                    <div className="d-flex">
                        <h6 className="my-auto text-muted">{length}</h6>
                        <img src={imgpath + "speech-bubble.png"} alt="" className="kommentarImg ml-2"/>
                    </div>
                </div>
                {loggedin ? 
                (
                <form className="col-lg-12 my-2 history postKommentar" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 d-flex    pl-0 ">
                            <img src={imgpath + "pen.png"} alt="" className="mx-4"/>
                            <input type="text" placeholder="Overskrift..." className=" text-muted p-0" 
                            onChange={(e) => setKommentarPOST({ ...kommentarPOST, titel: e.target.value}) } />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-lg-8 d-flex pl-0 ">
                            <img src={imgpath + "pen.png"} alt="" className="mx-4"/>
                            <input type="text" placeholder="Kommentar..." className="text-muted p-0"
                            onChange={(e) => setKommentarPOST({ ...kommentarPOST, kommentaren: e.target.value}) }/>
                        </div>
                        <div className="col-lg-4 p-0 text-right d-none d-lg-block">
                            <button type="submit">Indsæt</button>
                        </div>
                    </div>
                    <div className="row mt.2 d-lg-none">
                        <div className="col-12 m-0 p-0">
                            <button type="submit"className="w-100" >Indsæt</button>
                        </div>

                    </div>
                </form>
                )
                :
                (

                    <div className="loginCon">
                        <div className="col-lg-12 d-flex justify-content-between  p-0 my-2 history">
                            <div className="col-9 d-flex pl-4 align-center my-auto">
                                <h6 className="m-0">Du skal være logget ind for at skrive en kommentar</h6>
                            </div>
                            <div className="col p-0 m-0 ">
                                {/* <button type="submit" className=""> <Link to="/login" className="text-white py-2" >Login her</Link> </button> */}
                                <Link to="/login">Login her</Link>
                            </div>
                        </div>
                    </div>

                )
                }
            </div>
            {/* {kommentarOutput} */}
            
            <Comments comments={currentComments} loading={loading} bruger={bruger} />
            <Pagination
                CommentsPerPage={commentsPerPage}
                totalComments={comments.length}
                paginate={paginate}
            />
        </div>
    );
}
 
export default SpecificProduct;