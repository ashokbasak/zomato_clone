const Restaurant = require("../models/restaurantSchema");


exports.getRestaurantByLocId = (req, res) => {
  const { locId  } = req.params;
  
  Restaurant.find({ 
    city_id: locId  }, {})
      .then(response => {
          res.status(200).json({
              message:"Restaurant Fetched Successfully", 
              restaurant: response 
          })        
      })
      .catch(err =>{
          res.status(500).json({ error: err })
      })
  
}

exports.filterRestaurant = (req, res) => {
  let { location, cousine, mealtype, lowCost, highCost, sort, page } = req.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;
  const itemsPerPage = 2;
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  let filterObject = {};

  location && (filterObject["city_id"] = location);
  cousine && (filterObject["cousine_id"] = { $in: cousine });
  mealtype && (filterObject["mealtype_id"] = mealtype);
  lowCost &&
    highCost &&
    (filterObject["min_price"] = { $gte: lowCost, $lte: highCost });

  Restaurant.find(filterObject)
    .sort({
      min_price: sort,
    })
    .then((response) => {
      const filteredResponse = response.slice(startIndex, endIndex);
      res.status(200).json({
        message: "Restaurant fetched successfully",
        restaurant: filteredResponse,
      });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getRestaurantDetailsById = (req, res) => {
  const { resId } = req.params;

  Restaurant.findById(resId)
    .then((response) => {
      res.status(200).json({
        message: "Fetched Successfully",
        restaurant: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
