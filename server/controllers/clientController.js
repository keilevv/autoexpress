// clientController.js
// Import Models
Car = require("../models/carModel");
Client = require("../models/clientModel");

exports.register = async (req, res) => {
  const client = await new Client({
    name: req.body.name,
    surname: req.body.surname,
    lastname: req.body.lastname,
    email: req.body.email,
    telephoneNumber: req.body.telephoneNumber,
    birthday: new Date(req.body.birthday),
    countryId: req.body.countryId,
  });
  client.save((err, client) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "Client was registered successfully!" });
      return;
    }
  });
};
// Handle index actions
exports.index = function (req, res) {
  Client.get(async function (err, clients) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    const cursor = await Client.aggregate([
      {
        $lookup: {
          from: "cars",
          localField: "cars",
          foreignField: "_id",
          as: "cars",
        },
      },
    ]);

    res.json({
      status: "success",
      message: "Clients list retrieved successfully",
      data: cursor,
    });
  });
};

// Handle view client client
exports.get = function (req, res) {
  Client.findById(req.params.user_id, function (err, client) {
    if (err) res.send(err);
    res.json({
      message: "Client details loading..",
      data: client,
    });
  });
};

// Handle list client by username
exports.getByName = function (req, res) {
  Client.find({ name: req.body.name }, function (err, client) {
    if (err) res.send(err);
    res.json({
      message: "Client by name loading...",
      data: client,
    });
  });
};
// Handle update client client
exports.update = function (req, res) {
  Client.findById(req.params.client_id, function (err, client) {
    if (err) res.send(err);
    client.name = req.body.name;
    client.surname = req.body.surname;
    client.lastname = req.body.lastname;
    client.email = req.body.email;
    client.telephoneNumber = req.body.telephoneNumber;
    client.birthday = new Date(req.body.birthday);
    client.countryId = req.body.countryId;
    client.cars = req.body.cars;
    // save the client and check for errors
    client.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Client updated",
        data: client,
      });
    });
  });
};
// Handle delete service
exports.delete = function (req, res) {
  Client.remove(
    {
      _id: req.body.client_id,
    },
    function (err, client) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Client deleted",
      });
    }
  );
};