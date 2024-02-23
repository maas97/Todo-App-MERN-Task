const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const hpp = require("hpp");
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");

//Middlewares
const { _404, _500 } = require("./Middlewares/errorsWare");

//Routers
const TodoRouter = require("./Components/Todos/TodoRouter");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000000000, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

const app = express();
app.use(hpp({}));

const v1Router = express.Router();

// MiddleWares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); 
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(process.env.PUBLIC_FOLDER || "public"));
app.use(limiter);
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "example.com"],
    },
  })
);

// // Website Routes
app.use("/", TodoRouter);

// // Error Handlers
app.use(_404); // Not Found Handlers
app.use(_500); // Error Handler

module.exports = app;