import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';

import $ from "jquery"

const Comments = ({ comments, loading, bruger }) => {

  const [commentPutData, setCommentPutData] = useState({});
  const [brugerID, setBrugerID] = useState("");
  const [loggedIn, setLoggedin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [c_id, setC_Id] = useState("");


  useEffect(() => {
    let userData = localStorage.getItem("bruger"); 
    userData = JSON.parse(userData); 
    if(userData != null){    
        setLoggedin(userData.data.login_godkendt);
        setBrugerID(userData.data.bruger_id);
    }
    }, []);

    console.log(commentPutData)

  function handlePut(e){
    console.log(e.target.value)
    let id = e.target.value
    axios
    .get(`http://localhost:5033/kommentar/${id}`)
    .then((res) => {
      console.log(res.data);
      if(res.data.bruger === brugerID) {
        setEdit(true);
        setC_Id(id);

      } else {
        alert("Du kan kun rette dine egne kommentar")
      }
      // alert("Din kommentar er nu slettet");
    })
    .catch((error) => {
      console.log(error);
    });
    // console.log("ss")
  }
function putComment(e){

  e.preventDefault();
  
  axios.put(`http://localhost:5033/kommentar/admin/${c_id}`, commentPutData )
  .then(function (response) {
        console.log(response);
        setEdit(false)
    })
    .catch(function (error) {
          console.log(error);
      });

    }
    

  // console.log(bruger)
  function handleDelete(e){
    console.log(e.target.value)
    let id = e.target.value;
    // if (id === bruger.bruger_id){
      // console.log("match")
      e.preventDefault();
      axios
        .get(`http://localhost:5033/kommentar/${id}`)
        .then((res) => {
          console.log(res.data);
          if(res.data.bruger === brugerID) {
            deleteComment(id)
          } else {
            alert("Du kan kun slette dine egne kommentar")
          }
          // alert("Din kommentar er nu slettet");
        })
        .catch((error) => {
          console.log(error);
        });
}

  function deleteComment(id){
    if (window.confirm("Er du sikker på at du vil slette denne kommentar")) {
      
      axios
      .delete(`http://localhost:5033/kommentar/admin/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Din kommentar er nu slettet");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}




  if (loading) {
    return <h2>Loading...</h2>;
  }


  // console.log(color)
  // console.log(comments)
  // console.log(bruger)
  return (
    <ul className='col-12 text-center kommentarBox p-0'>
    { edit ?
      (
        <form action="PUT" onSubmit={putComment} className="retKommentar">
          <h4 className="py-4">Ret din kommentar</h4>
          <div className="row">
            <div className="col-12">
              <input type="text"  name="titel" placeholder="Overskrift" className="w-100" onChange={(e) => setCommentPutData({ ...commentPutData, titel: e.target.value}) }/>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <input type="text"  name="titel" placeholder="Kommentar" className="w-100" className="w-100" onChange={(e) => setCommentPutData({ ...commentPutData, kommentaren: e.target.value}) }/>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="w-100">Ret</button>
            </div>
          </div>
        </form>
      ):
      (
        ""
      ) 
      }
      {comments.map(c => (

          <li key={c.id} className='list-group-item my-2 '>

                <div className="col-1 imgCon" ></div>
                <div className="col-12 text-left">
                    <h3 >{c.bruger.fornavn + " " + c.bruger.efternavn}</h3>
                    <h6 className="text-muted text-left pb-3">{c.oprettet}</h6>
                    <h6 className="hideShow">{c.titel}</h6>
                    <p className="hideShow">{c.kommentaren}</p>
                </div>

              {loggedIn ? 
              (
                <Fragment>
                  <button value={c._id} 
                    onClick={handleDelete} className="p-0 ml-2 text-center deleteBtn">
                    <img src="https://img.icons8.com/flat_round/64/000000/delete-sign.png" alt="deleteIcon" className="img-fluid mx-auto" />
                  </button>

                  <button value={c._id} onClick={handlePut} className="p-0 mx-auto text-center editBtn">
                    <img src="https://img.icons8.com/ios/50/000000/edit.png" alt="editIcon" className="img-fluid mx-auto editBtn"/>
                  </button>
                </Fragment>

              )
              :
              (
                  ""
              )
              }
             

            {/* <img src="https://img.icons8.com/ios/50/000000/edit.png" alt="editIcon" onClick={handlePut}/> */}
          </li>

        )
      )}

    </ul> 
    
      
  );
};

export default Comments;