const User = require('../models/user');

const enroll_user = (req, res) => {
    let user = new User(req.body);
    let saveUser = () => {
        user.save((err) => {
            if (err) {
                console.log(err);
                res.send({ error: { err } });
            }
            else {
                res.send({
                    status: 'success',
                    user
                })
            }
        });
    }
    saveUser();
}

const login_user = (req, res) => {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;
        if(!user){
            res.send({
                authenticated: false,
                error: {username: 'Username not found'}
            })
        }
        else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err){
                    res.send({
                        authenticated: false,
                    })
                }
                if(isMatch){
                    res.send({
                        authenticated: true,
                        user: user._doc
                    })
                }
                else{
                    res.send({
                        authenticated: false,
                        error: {password: 'Incorrect Password'}
                    })
                }
            });
        }
    });
}

module.exports = {
    enroll_user,
    login_user,
}