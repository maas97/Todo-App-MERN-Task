const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

const app = require('./app')

const db = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
)

const port = process.env.PORT || 8090;

mongoose
  .connect(db)
  .then(() => {
    console.log("DB Connected Successfully");

    // Run The Server
    app.listen(port, () => {
      console.log(`App Running on port ${port}`);
    });
  });


  // Handle Unhandled Rejections
process.on("unhandledRejection", (err) => {
    // app.exit();
    console.log("UNHANDLED REJECTION! 💥 Shutting Down...");
    console.log(err.name, err.stack, err.message);
    process.exit(1);
  });
  

  // Handle uncaught exceptions
  process.on("uncaughtException", (err) => {
    // app.exit();
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting Down...");
    console.log(err.name, err.message);
    process.exit(1);
  });