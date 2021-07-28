//Dependencies Declaration
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//View Engine Setup
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

//Static Folder Styles
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Rendering the view
app.get('/', (req,res) => {
    res.render('contact');
});

//Email POST Request
app.post('/send', (req,res) =>{

    console.log(req.body);
    //Variables needed for email
    let correo = `${req.body.Correo}`;
    let MetroGDL = `${req.body.MetropoliGDL}`;
    let MasDe30 = `${req.body.MasDe30}`;
    console.log(MetroGDL, MasDe30);

//NodeMailer Settings
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: 'test.multiburo@gmail.com',
        pass: 'tuqrkmzmetjpmsdv'
    }
});

//Mail Option 1
let mailOptions = {
    from: '"Multiburo" <test.multiburo@gmail.com>', // sender address
    to: correo, // list of receivers
    subject: "Multiburó Agradece Tu Tiempo", // Subject line
    text: "", // plain text body
    html: "<b>Gracias por tu tiempo!</b>", // html body
};

//Mail Options2
let mailOptions2 = {
    from: '"Multiburo" <test.miltiburo@gmail.com>', // sender address
    to: correo, // list of receivers
    subject: "Multiburó Agradece Tu Tiempo", // Subject line
    text: "", // plain text body
    html: "<b>Tienes una promocion!</b>", // html body
}

//Send mail with defined transport object
//If condition that validates the required data in order to send an email response
if( MetroGDL == "Yes" && MasDe30 == "Yes"){
    transporter.sendMail(mailOptions2, (error,info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent"); 
    })
} else {
    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
        return console.log(error);
        }
    
        console.log("Message sent");
    })
 }
 
 res.render('thanks')
});





app.listen(3000, () => console.log('Server Started...'))