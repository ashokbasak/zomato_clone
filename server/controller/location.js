const Location = require("../models/locationSchema");

exports.getLocation = (req, res, next) => {
  Location.find().then((result) => {
    res
      .status(200)
      .json({ message: "Location Fetched Sucessfully", location: result });
  });
};


exports.addLocation = (req, res, next) => {
  const location = req.body.location;
  const locationId = req.body.locationId;

  const Location = new Location({ location: location, locationId: locationId });
  Location.save()
    .then((result) => {
      res
        .status(200)
        .json({ message: "Location Added Sucessfully", location: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

