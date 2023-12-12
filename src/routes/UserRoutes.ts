import { Router } from "express";
import { CreateUserHandle } from "../controllers/user/create/CreateUser";

const userRoutes = Router();

userRoutes.post("/create", CreateUserHandle);

export default userRoutes;
