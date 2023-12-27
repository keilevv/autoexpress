User = require("../models/userModel");

exports.index = function (req, res) {
  User.find({}).then((response) => {
    User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles",
        },
      },
    ]).then((cursor) => {
      const builtUser = cursor.map((user) => {
        return {
          username: user.username,
          email: user.email,
          roles: user.roles.map((role) => {
            return role.name;
          }),
        };
      });
      return res.json({
        status: "success",
        message: "Users list retrieved successfully",
        data: builtUser,
      });
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
