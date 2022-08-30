const Relationship = require('../models/relationship');
const Prescriber = require('../models/prescriber');
const Patient = require('../models/patient');
const mongoose = require('mongoose');

const manage_relationship = (req, res, next) => {if(!req.body.action){
        res.send('Must have an action');
    }
    else{
        Prescriber.findById(req.body.prescriber, function(err, data) {
            if (err) return next(err);
            if(data === null){
                res.send('Prescriber does not exist');
            }
            else {
                Patient.findById(req.body.patient, function(err, data) {
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

const get_relationships = (req, res, next) => {
    if(!req.params._id){
        res.send([]);
    }
    else if(req.params.type === 'patient'){
        Relationship.find({patient: req.params._id})
        .populate("patient", 'username firstName lastName')
        .populate("prescriber", 'username firstName lastName npiNumber deaNumber')
        .exec(function (err, data) {
            if (err) return next(err);
            res.send(data)
        });
    }
    else if(req.params.type === 'prescriber'){
        Relationship.find({prescriber: req.params._id})
        .populate("patient", 'username firstName lastName')
        .populate("prescriber", 'username firstName lastName npiNumber deaNumber')
        .exec(function (err, data) {
            if (err) return next(err);
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