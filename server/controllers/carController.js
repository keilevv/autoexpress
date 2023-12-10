// clientController.js
// Import Models
Car = require("../models/carModel");
Client = require("../models/clientModel");

exports.register = (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color,
    doors: req.body.doors,
    clients: req.body.clients,
  });
  car.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.send({ message: "Car was registered successfully!" });
      return;
    }
  });
};
// Handle index actions
exports.index = function (req, res) {
  Car.get(async function (err, cars) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    const cursor = await Car.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "clients",
          foreignField: "_id",
          as: "clients",
        },
      },
    ]);
    res.json({
      status: "success",
      message: "Cars list retrieved successfully",
      data: cursor,
    });
  });
};

// Handle view user user
exports.get = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    res.json({
      message: "Client details loading..",
      data: user,
    });
  });
};

// Handle update client client
exports.update = function (req, res) {
  Car.findById(req.params.car_id, function (err, car) {
    if (err) res.send(err);
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.year = req.body.year;
    car.plate = req.body.plate;
    car.color = req.body.color;
    car.doors = req.body.doors;
    car.clients = req.body.clients;
    // save the client and check for errors
    car.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Car updated",
        data: car,
      });
    });
  });
};