const Item = require('../models/menuItems');

exports.getMenuItemsByResId = (req, res) => {
    const { resID } = req.params;
    
    Item.find({ restaurantId: resID })
        .then(response => {
            res.status(200).json({
                message:"Menu Items Fetched Successfully", 
                restaurant: response 
            })        
        })
        .catch(err =>{
            res.status(500).json({ error: err })
        })
    
}