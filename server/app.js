const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("./routes/index");
const paymentRoutes = require("./Controller/payment");
const cookieSession = require("cookie-session");
const passportSetup = require("./controller/passport");
const passport = require("passport");
const authRoute = require("./controller/auth");
require("./db/connection")

dotenv.config();
app.use(
    cookieSession({ name: "session", keys: ["edureka"], maxAge: 24 * 60 * 60 * 1000 })
  );

 

// app.use(cors());
 const corsOptions ={
    origin:'http://localhost:3000', 
    methods: "GET,POST,PUT,DELETE",
    credentials:true, 
    //access-control-allow-credentials:true           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/",path);
app.use("/api/payment/", paymentRoutes);
app.use("/auth", authRoute);
app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
})