const { UserController } = require("../controllers");
const userRoute = require("express").Router();
const { auth, upload } = require("../middlewares");

userRoute.post("/login", UserController.login);
userRoute.post("/register", UserController.register);
userRoute.get("/detail", auth, UserController.detailUser);
userRoute.post("/changeFoto", auth, upload.single("foto"), UserController.changeFoto);

module.exports = userRoute;
