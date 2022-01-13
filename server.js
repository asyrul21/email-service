const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const { initializeDatabase } = require("./config/database");
const http = require("http");
const events = require("events");
const EM = new events.EventEmitter();

// // middlewares
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

console.log("NODE ENVIRONMENT: " + process.env.NODE_ENV);
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// body parser
app.use(express.json());

// Routes
const EmailRoutes = require("./routes/emailRoutes");

app.get("/api/", (req, res) => {
  res.send("Xendit Notification API is running");
});
app.use("/api/email", EmailRoutes);

// initialise User Roles
initializeDatabase(process.env.NODE_ENV, EM);

// error middlewares
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
module.exports =
  process.env.NODE_ENV === "test"
    ? server.listen(
        PORT,
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
      )
    : // wait for the database is loaded before starting listening
      EM.on("initializationDone", () => {
        server.listen(PORT, () => {
          console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
          );
        });
      });
