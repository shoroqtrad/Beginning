const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes= require('./api/routes/user');

// for Deprecation Warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://shoroqtrad:" +
    process.env.MONGO_ATLAS_PW +
    "@nodeapi20-xmm2i.mongodb.net/test?retryWrites=true&w=majority",{dbName: 'nodeapp'});

mongoose.Promise = global.Promise;
app.use(morgan("dev"));

app.use('/uploads', express.static('uploads'));

//bodyparser === url & json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);



//indicates that the requested resource is not available now.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

/* indicates that the request is valid,
but the server is totally confused and 
the server is asked to serve some unexpected condition.*/
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;