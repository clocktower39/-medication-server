const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const enroll_user = (req, res, next) => {
  let user = new User(req.body);
  let saveUser = () => {
    user.save((err) => {
      if (err) return next(err);
      res.send({
        status: "success",
        user,
      });
    });
  };
  saveUser();
};

const login_user = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send({ error: { message: 'Missing required field(s)', } })
  }
  else {
    User.findOne({ username }, function (err, user) {
      if (err) return next(err);
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
  }
};

const change_password = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  User.findOne({ username: res.locals.user.username }, function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.send({
        error: { username: "Username not found" },
      });
    } else if (user.username === "GUEST") {
      res.send({
        error: { username: "GUEST password can not be changed." }
      })
    } else {
      if (!currentPassword || !newPassword) {
        res.send({ error: { message: 'Missing required field(s)', } })
      }
      else {
        user.comparePassword(req.body.currentPassword, function (err, isMatch) {
          if (err) {
            res.send({
              error: { status: 'Incorrect Current Password' },
            });
          }
          if (isMatch) {
            user.password = req.body.newPassword;
            user.save().then(savedUser => {
              const accessToken = jwt.sign(savedUser._doc, ACCESS_TOKEN_SECRET, {
                expiresIn: "30d", // expires in 30 days
              });
              res.send({ accessToken });
            })
          } else {
            res.send({
              error: { status: "Password change failed." },
            });
          }
        });
      }
    }
  });
};

const update_contact_info = (req, res, next) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName, !lastName) res.send({ error: { message: 'Missing required field(s)', } })
  else {
    User.findOne({ username: res.locals.user.username }, function (err, user) {
      if (err) return next(err);
      if (!user) {
        res.send({
          error: { username: "Username not found" },
        });
      } else if (user.username === "GUEST") {
        res.send({
          error: { username: "GUEST info can not be changed." }
        })
      } else {
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        user.save().then(savedUser => {
          const accessToken = jwt.sign(savedUser._doc, ACCESS_TOKEN_SECRET, {
            expiresIn: "30d", // expires in 30 days
          });
          res.send({ accessToken });
        })
      }
    });
  }
};

const agent_info = (req, res, next) => {
  User.findOne({ _id: req.body._id }, function (err, agent) {
    if (err) return next(err);
    if (!agent) {
      res.send({
        error: { _id: "Agent not found" },
      });
    }
    else {
      const filteredAgentData = ({
        _id,
        username,
        firstName,
        lastName,
        email,
        role,
        supervisor,
        projects,
      }) => ({
        _id,
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
    }
  });
};

const agent_search = (req, res, next) => {
  const regexBody = req.body;
  for (const key in regexBody) {
    if (isNaN(Number(regexBody[key])) && key !== "_id") {
      regexBody[key] = new RegExp(regexBody[key], "i");
    }
  }

  User.find(regexBody, function (err, data) {
    if (err) return next(err);
    const filtered = data.map(
      ({ _id, username, firstName, lastName, email, role, supervisor, projects }) => ({
        _id,
        username,
        firstName,
        lastName,
        email,
        role,
        supervisor,
        projects,
      })
    );
    res.send(filtered);
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
  agent_search,
  change_password,
  update_contact_info,
};
