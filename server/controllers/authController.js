// userController.js
const config = require("../config");

// Import Models
User = require("../models/userModel");
Role = require("../models/roleModel");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.register = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.role) {
      Role.find(
        {
          name: { $in: req.body.role }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
// Handle index actions
exports.index = function (req, res) {
  User.get(function (err, user) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "user list retrieved successfully",
      data: user,
    });
  });
};

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.serverConfig.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    // for (let i = 0; i < user.roles.length; i++) {
    //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    // }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  })

};

// Handle view user user
exports.get = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "User details loading..",
      data: user,
    });
  });
};

// Handle list user by username
exports.getByName = function (req, res) {
  User.find({ name: req.params.name }, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "Services by section loading...",
      data: user,
    });
  });
};
// Handle update user user
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = req.body.role;
    user.birthday = req.body.birthday;
    // save the user and check for errors
    user.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "User updated",
        data: user,
      });
    });
  });
};
// Handle delete service
exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.info_id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "User deleted",
      });
    }
  );
};