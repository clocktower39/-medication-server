const Patient = require('../models/patient');

const enroll_patient = (req, res) => {
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
  }

  const search_patients = (req, res) => {
      Patient.find(req.body, function(err, data) {
          if (err) throw err;
          res.send(data)
      });
  }

module.exports = {
    enroll_patient,
    search_patients,
}