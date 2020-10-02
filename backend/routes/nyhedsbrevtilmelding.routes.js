const Nyhedsbrevtilmelding = require('../models/nyhedsbrevtilmelding.model');

const express = require('express');
const formData = require('express-form-data');

// const bodyParser = require('body-parser');
// const path = require('path');
// const fetch = require('node-fetch');          

const router = express.Router();
router.use(formData.parse());     






// // Bodyparser Middleware
// router.use(bodyParser.urlencoded({ extended: true }));

// // // Static folder
// router.use(express.static(path.join(__dirname, 'public')));

// // Signup Route
// router.post('/', (req, res) => {
//     // console.log(req.body);
//     // res.send("hello");
//   const {  email } = req.body;

// //   Make sure fields are filled
//   if (!email) {
//     res.redirect('/fail.html');
//     return;
//   }


// //   Construct req data
//   const data = {
//     members: [
//       { 
//         email_address: email,
//         status: 'subscribed',
//       }
//     ]
//   };

//   const postData = JSON.stringify(data);

//   fetch('https://server.api.mailchimp.com/3.0/lists/f204245a94?skip_merge_validation=true&skip_duplicate_check=true', {
    
      
//     method: 'POST',
//     headers: {
//       Authorization: 'auth db52e45ea2a0100314cd69f1cbbafeaa-us19'
//     },
//     body: postData
//   })
//     .then(res.statusCode === 200 ?
//       res.redirect('/success.html') :
//       res.redirect('/fail.html'))
//     .catch(err => console.log(err))
// })







// ----- HENT/GET ALLE - ADMIN -----------------------------------------------------------------------------------------

router.get('/admin', async (req, res) => {

    console.log("HENT ALLE nyhedsbrevtilmelding");

    try {
        const nyhedsbrevtilmelding = await Nyhedsbrevtilmelding.find();

        res.json(nyhedsbrevtilmelding);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i / :" + err.message }); // 500 = serverproblem
    }

});



// ----- HENT/GET UDVALGT nyhedsbrevtilmelding - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.get('/admin/:id', findNyhedsbrevtilmelding, async (req, res) => { //

    console.log("HENT UDVALGT nyhedsbrevtilmelding")

    res.json(res.nyhedsbrevtilmelding);

});



// ----- OPRET/POST NY - IKKE ADMIN! ---------------------------------------------------------------------------------------
// ----- Kræver ikke admin - brugerne skal kunne poste en tilmelding til nyhedsbrev!

router.post('/', async (req, res) => {

    console.log("POST nyhedsbrevtilmelding");
   
    // Tjek først om findes i forvejen....    
    let tilmelding = await Nyhedsbrevtilmelding.findOne({ email: req.body.email })
    
    if (tilmelding) {
        
        return res.status(201).json({ message: "Nok bare en tastefejl. Prøv igen, eller brug en anden email" })
        
    } 

    const nyhedsbrevtilmelding = new Nyhedsbrevtilmelding(req.body);

    try {
        const ny = await nyhedsbrevtilmelding.save();
        res.status(201).json({ message: "Ny nyhedsbrevtilmelding er oprettet", nyhedsbrevtilmelding: ny });

    } catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error });
    }

});



// ----- SLET/DELETE UD FRA ID - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete('/admin/:id', findNyhedsbrevtilmelding, async (req, res) => {

    console.log("DELETE nyhedsbrevtilmelding ud fra ID")

    try {

        await res.nyhedsbrevtilmelding.remove();
        res.status(200).json({ message: 'nyhedsbrevtilmelding er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'nyhedsbrevtilmelding kan ikke slettes - der er opstået en fejl: ' + error.message })
    }



});


// ----- SLET/DELETE UD FRA EMAIL - IKKE ADMIN (en besøgende skal kunne afmelde sig med sin email) ------------------------------------------------------------------------------------------------------------ 

router.delete('/afmeld/:email', async (req, res) => {

    console.log("DELETE nyhedsbrevtilmelding ud fra EMAIL", req.params.email)

    try {

        let nyhedsbrevtilmelding = await Nyhedsbrevtilmelding.findOne({email: req.params.email});

        if (nyhedsbrevtilmelding == null) {
            return res.status(404).json({ message: 'Ingen nyhedsbrevtilmelding med den EMAIL' });
        }

        await nyhedsbrevtilmelding.remove();
        res.status(200).json({ message: 'nyhedsbrevtilmelding er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'nyhedsbrevtilmelding kan ikke slettes - der er opstået en fejl: ' + error.message })
    }



});

// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put('/admin/:id', findNyhedsbrevtilmelding, async (req, res) => {

    console.log("PUT nyhedsbrevtilmelding")

    try {

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        res.nyhedsbrevtilmelding.email = req.body.email;


        await res.nyhedsbrevtilmelding.save();
        res.status(200).json({ message: 'nyhedsbrevtilmelding er rettet', rettetnyhedsbrevtilmelding: res.nyhedsbrevtilmelding });

    } catch (error) {
        res.status(400).json({ message: 'nyhedsbrevtilmelding kan ikke rettes - der er opstået en fejl: ' + error.message })
    }

});



// MIDDLEWARE 
// FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findNyhedsbrevtilmelding(req, res, next) {

    console.log("FIND UD FRA ID")

    let nyhedsbrevtilmelding;

    try {

        nyhedsbrevtilmelding = await Nyhedsbrevtilmelding.findById(req.params.id);

        if (nyhedsbrevtilmelding == null) {
            return res.status(404).json({ message: 'Ingen nyhedsbrevtilmelding med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message }); // problemer med server
    }

    res.nyhedsbrevtilmelding = nyhedsbrevtilmelding; // put det fundne ind i responset
    next();
}


module.exports = router;