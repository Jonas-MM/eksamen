import React, { useState } from "react"
import emailjs from "emailjs-com"
import axios from "axios";


//scss
import "../style/nyhedsbrev.scss"

function Nyhedsbrev(props) {

    const [isOpen, setIsOpen] = useState(false);

    const [email, setEmail] = useState({});
    const [message, setMessage] = useState("");

      const handlesubmit = (e) => {
        emailjs.sendForm('service_h7o4rqz', 'template_va537ra', e.target, 'user_YNodEtdGCNSrfo4BKYo3k')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

        e.preventDefault();
        axios
          .post("http://localhost:5033/nyhedsbrevtilmelding", email)
          .then((res) => {
            console.log(res.data);
            setIsOpen(true);
            setMessage(res.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      };

        function handleClose() {
            setIsOpen(false);
        }
   

    return(
        <div className="container-fuild pb-5" id="nyhedsbrevCon">
            <div className="text-dark">
                {isOpen ?
                (
                    <div className="popup-box">
                        <div className="box">
                            <button className="close-icon" onClick={handleClose}>X</button>
                            <p>
                                {message}
                            </p>
                        </div>
                    </div>
                )
                : 
                (
                    ""
                )
                }
            </div>
            <div className="bgrimg d-flex">
                <div className="container w-lg-50 my-auto ">
                    <div className="row d-flex align-items-center">
                        <div className="col-12 ">
                            <h3 className="lobster">Tilmeld dig vores nyhedsbrev</h3>
                        </div>
                        <div className="col-12">
                            <p>Der er mange udgaver af Lorem ipsum, men de fleste udgaver</p>
                        </div>
                        <div className="col-12">
                            <form action="/signup" method="POST" onSubmit={handlesubmit} className="d-flex mt-5">
                                <input type="email" placeholder="indtast din email..." defaultValue="jonas@live.dk" name="email" className="w-100" required onChange={(e) => setEmail({ email: e.target.value })}/>
                                <button className="px-5" type="submit">TILMELD</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Nyhedsbrev;