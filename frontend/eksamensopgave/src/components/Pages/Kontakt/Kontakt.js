import React, { useState } from "react"
import emailjs from "emailjs-com"
import axios from "axios";

//scss/css
import "./kontakt.scss";

function Kontakt () {
    const [formData, setFormData] = useState({})

    const [fejl, setFejl] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    

    function handleSubmit(e){
        e.preventDefault();

        emailjs.sendForm('service_h7o4rqz', 'template_num8iak', e.target, 'user_YNodEtdGCNSrfo4BKYo3k')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        axios
          .post("http://localhost:5033/kontakt", formData)
          .then((res) => {
            console.log(res.data);
            setMessage(res.data.kontakt);
            setIsOpen(true);
          })
          .catch((error) => {
            console.log(error);
            setMessage("Der skete en fejl, prøv igen")
            setFejl(true);
          });

          
        }

            function handleClose() {
            setIsOpen(false);
            setFejl(false);
        }

    console.log(formData);

    return ( 
        <div className="container w-lg-50" id="kontakt">
                {fejl ?
                (
                    <div className="popup-box">
                        <div className="box">
                            <button className="close-icon" onClick={handleClose}>X</button>
                            <h6 className="mb-3">
                                {message}
                            </h6>
                        </div>
                    </div>
                )
                : 
                (
                    ""
                )
                }
                {isOpen ?
                (
                    <div className="popup-box">
                        <div className="box">
                            <button className="close-icon" onClick={handleClose}>X</button>
                            <h6 className="mb-3">
                                Tak for din besked, vi har modtaget følgende oplysninger:
                            </h6>
                            <div className="row">
                                <div className="col-12 py-2 ">
                                    <h6>Navn: </h6>{message.navn}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 py-2 ">
                                    <h6>Emne: </h6> {message.emne}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 py-2">
                                    <h6>Email: </h6>{message.email}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 py-2">
                                    <h6>besked: </h6>{message.besked}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                : 
                (
                    ""
                )
                }
            <div className="row">
                <div className="col-12 text-center mb-5">
                    <h4 className="lobster">Kontakt os</h4>
                    <p className="faded mx-lg-5 mt-4">Der er mange tilgængelige udgaver af lorem ipsum, men de fleste udgaver har gennemgået forandringer, når nogen har tilføjet humor eller tilfældige ord, som på ingen måde ser ægte ud</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 formBox">
                    <form action="" method="POST" onSubmit={handleSubmit}>
                        <input type="text" name="name" required placeholder="Dit navn" className="col-12 my-1" onChange={(e) => setFormData({ ...formData, navn: e.target.value })}/>
                        <input type="email" name="email" required placeholder="Dit email" className="col-12 my-1" onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                        <input type="text" required name="subject" placeholder="Emne" className="col-12 my-1" onChange={(e) => setFormData({ ...formData, emne: e.target.value })}/>
                        <textarea name="" id="" cols="30" name="message" rows="7" required placeholder="Din besked" className="col-12 my-1" onChange={(e) => setFormData({ ...formData, besked: e.target.value })} />
                        <div className="text-right">
                            <button type="submit" className="mr-auto col-sm-12 col-lg-4">Send</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 addresseBox">
                    <address className="faded text-left">
                        <b>Addresse: </b> <span> Øster utterupvej 1 9200 Aalborg</span>
                        <br/>
                        <b>Telefon: </b><a href="tel:123-456-7890" className="text-dark text-muted">+45 25 26 95 40</a> 
                    </address>
                    <img src="./Images/kort.png" alt="" className="img-fluid"/>
                </div>
            </div>
        </div>
    );
}
 
export default Kontakt;