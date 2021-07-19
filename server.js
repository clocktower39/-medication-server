const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const dbUrl = process.env.DBURL;
let PORT = process.env.PORT;
if( PORT == null || PORT == ""){
    PORT = 8000;
}
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

let corsWhitelist = ['*'];
var corsOptions = {
  origin: function (origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

let Prescriber = mongoose.model('Prescriber', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    faxNumber: { type: Number },
    npiNumber: { type: Number, required: true, index: { unique: true } },
    deaNumber: { type: String, required: true, index: { unique: true } },
    practiceName: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true} ,
    patients: { 
      active: { type: Array, required: true },
      noLongerTreating: { type: Array, required: true }
    }
});

let Patient = mongoose.model('Patient', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: Number},
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
    prescribers: { 
      active: { type: Array, required: true },
      removedFromCare: { type: Array, required: true }
    }
});

app.post('/prescriberEnroll', (req, res) => {
  let prescriber = new Prescriber(req.body);
  
  let savePrescriber = () => {
    prescriber.save((err)=>{
          if(err){
            console.log(err);
            res.send({error: {err}});
          }
          else{
              res.send({
                  status: 'success',
                  prescriber
              })
          }
      });
  }
  savePrescriber();
})

app.post('/patientEnroll', (req, res) => {
  let patient = new Patient(req.body);
  
  let savePatient = () => {
    patient.save((err)=>{
          if(err){
            console.log(err);
            res.send({error: {err}});
          }
          else{
              res.send({
                  status: 'success',
                  patient
              })
          }
      });
  }
  savePatient();
})

mongoose.connect(dbUrl, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    } , (err) => {
    console.log('mongo db connection', err)
})

let server = http.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});

