const mongoose = require("mongoose");


const mongo_URL =
  "mongodb+srv://ashok:ashok1980@cluster0.22ex8.mongodb.net/zomato?retryWrites=true&w=majority";
mongoose.connect(mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database");
}).catch(err => console.log(err))