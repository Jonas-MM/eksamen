import axios from 'axios';
import React, { useState } from 'react';

import $ from "jquery"

const Comments = ({ comments, loading, bruger }) => {

  const [commentPostData, setCommentPostData] = useState({});


  function handlePut(e){
    $(".hideShow").css("display", "none")
    // console.log("ss")


    // e.preventDefault();

    // axios.put(`http://localhost:5033/kommentar/admin/`, commentPostData )
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    

  }




  if (loading) {
    return <h2>Loading...</h2>;
  }



  // console.log(color)
  // console.log(comments)
  return (
    <ul className='col-12 text-center kommentarBox p-0'>
      {comments.map(c => (

          <li key={c.id} className='list-group-item my-2 '>


            <div className="col-1 imgCon" ></div>
            <div className="col-11 text-left">
                <h3 >{c.bruger.fornavn + " " + c.bruger.efternavn}</h3>
                <h6 className="text-muted text-left pb-3">{c.oprettet}</h6>
                <h6 className="hideShow">{c.titel}</h6>
                <p className="hideShow">{c.kommentaren}</p>
            </div>

            
            <div className="row " style={{display: "none"}}> 
              <div className="col-6">
                    <input type="text" placeholder="Titel" className="w-100"/>
              </div>
              <div className="col-6">
                    <input type="text" placeholder="Kommentar" className="w-100"/>
              </div>
            </div>
            <img src="https://img.icons8.com/ios/50/000000/edit.png" alt="editIcon" onClick={handlePut}/>
          </li>

        )
      )}
    </ul>
  );
};

export default Comments;