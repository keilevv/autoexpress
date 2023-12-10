User = require("../models/userModel");
Client = require("../models/clientModel");
Car = require("../models/carModel");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }
  next();
};

// Clients

checkCountryIdorTelephoneNumber = (req, res, next) => {
  // countryId
  Client.findOne({
    countryId: req.body.countryId,
  }).exec((err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (client) {
      res.status(400).send({ message: "Failed! countryId is already in use!" });
      return;
    }
    // Email
    Client.findOne({
      telephoneNumber: req.body.telephoneNumber,
    }).exec((err, client) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (client) {
        res
          .status(400)
          .send({ message: "Failed! telephoneNumber is already in use!" });
        return;
      }
      next();
    });
  });
};

checkCarPlate = (req, res, next) => {
  // countryId
  Car.findOne({
    plate: req.body.plate,
  }).exec((err, car) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (car) {
      res.status(400).send({ message: "Failed! countryId is already in use!" });
      return;
    }
  });
};

const verifyRegister = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkCountryIdorTelephoneNumber,
  checkCarPlate
};
module.exports = verifyRegister;