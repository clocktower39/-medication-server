const Relationship = require('../models/relationship');
const Prescriber = require('../models/prescriber');
const Patient = require('../models/patient');
const mongoose = require('mongoose');

const manage_relationship = (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.body.prescriberId) || !mongoose.Types.ObjectId.isValid(req.body.patientId)){
        res.send('Invalid ID entered');
    }
    else if(!req.body.action){
        res.send('Must have an action');
    }
    else{
        Prescriber.findById(req.body.prescriberId, function(err, data) {
            if (err) throw err;
            if(data === null){
                res.send('Prescriber does not exist');
            }
            else {
                Patient.findById(req.body.patientId, function(err, data) {
                    if (err) throw err;
                    if(data === null){
                        res.send('Patient does not exist');
                    }
                    else {
                        let relationship = new Relationship(req.body);
                        relationship.date = new Date();
                        relationship.save((err) => {
                            if (err) {
                                console.log(err);
                                res.send({ error: { err } });
                            }
                            else {
                                res.send({
                                    status: 'success',
                                    relationship
                                })
                            }
                        });
                    }
                })

            }
        })
    }
}

const get_relationships = (req, res) => {
    if(req.params.type === 'patient'){
        Relationship.find({patientId: req.params._id}, function (err, data) {
            if (err) throw err;
            res.send(data)
        });
    }
    else if(req.params.type === 'prescriber'){
        Relationship.find({prescriberId: req.params._id}, function (err, data) {
            if (err) throw err;
            res.send(data)
        });
    }
    else {
        res.send('Invalid request')
    }
}

module.exports = {
    manage_relationship,
    get_relationships,
}