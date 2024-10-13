import express from "express";
import { getAllUsers, login, logout, signUp } from "../controller/User.controller.js";
const UserRouter = express.Router();

UserRouter.post("/signup", signUp);
UserRouter.post("/login", login);
UserRouter.post("/logout", logout);
UserRouter.get("/getAllUsers", getAllUsers);


export default UserRouter;
