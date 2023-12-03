const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Hello",
  });
});

const userRoute = require("./userRoute");

routes.use("/user", userRoute);

module.exports = routes;
