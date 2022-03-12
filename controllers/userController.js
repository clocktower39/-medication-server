const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const enroll_user = (req, res) => {
  let user = new User(req.body);
  let saveUser = () => {
    user.save((err) => {
      if (err) {
        console.log(err);
        res.send({ error: { err } });
      } else {
        res.send({
          status: "success",
          user,
        });
      }
    });
  };
  saveUser();
};

const login_user = (req, res) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.send({
        authenticated: false,
        error: { username: "Username not found" },
      });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          res.send({
            authenticated: false,
          });
        }
        if (isMatch) {
          const accessToken = jwt.sign(user._doc, ACCESS_TOKEN_SECRET, {
            expiresIn: "30d", // expires in 30 days
          });
          res.send({ accessToken });
        } else {
          res.send({
            authenticated: false,
            error: { password: "Incorrect Password" },
          });
        }
      });
    }
  });
};

const agent_info = (req, res) => {
  User.findOne({ _id: req.body._id }, function (err, agent) {
    if (err) throw err;
    if (!agent) {
      res.send({
        error: { _id: "Agent not found" },
      });
    }
    const filteredAgentData = ({ username, firstName, lastName, email, role, supervisor, projects }) => ({
      username,
      firstName,
      lastName,
      email,
      role,
      supervisor,
      projects,
    });
    res.send({
      agent: filteredAgentData(agent),
    });
  });
};

const checkAuthLoginToken = (req, res) => {
  res.send("Authorized");
};

module.exports = {
  enroll_user,
  login_user,
  agent_info,
  checkAuthLoginToken,
};
