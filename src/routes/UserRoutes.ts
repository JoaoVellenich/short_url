import { Router } from "express";
import { CreateUserHandle } from "../controllers/user/create/CreateUser";
import { LoginUserHandle } from "../controllers/user/login/LoginUser";

const userRoutes = Router();

userRoutes.post("/create", CreateUserHandle);
userRoutes.post("/login", LoginUserHandle);

export default userRoutes;
