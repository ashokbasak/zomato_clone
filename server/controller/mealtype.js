const MealType = require('../models/mealtypeSchema');  


exports.getMealType = (req, res, next) => {
    MealType.find().then(result => {
        res.status(200).json({ message: "MealType Fetched Sucessfully", mealtype: result })
    })
}

exports.addMealType = (req, res, next) => {
    const mealtype = req.body.mealtype;
    const content = req.body.content;
    const image = req.body.image;
    const mealtypeId = req.body.mealtypeId;

    const Mealtype = new MealType({mealtype: mealtype, content: content, image: image, mealtypeId: mealtypeId });
    Mealtype.save().then(result => {
        res.status(200).json({ message: "MealType Added Sucessfully", mealtype: result })
    }).catch(err => {
        console.log(err)
    })
}
