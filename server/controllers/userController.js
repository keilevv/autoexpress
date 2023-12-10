User = require("../models/userModel");

exports.index = function (req, res) {
  User.get(async function (err, response) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }

    const cursor = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
    ]);

    const builtUser = cursor.map((user) => {
      return {
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => {
          return role.name;
        }),
      };
    });

    res.json({
      status: "success",
      message: "users retrieved successfully",
      data: builtUser,
    });
  });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};