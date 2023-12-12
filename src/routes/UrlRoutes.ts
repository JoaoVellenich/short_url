import { Router } from "express";
import { authenticateJWT } from "../middlewares/token";
import { shortUrlHandle } from "../controllers/url/shortUrl/short";

const urlRoutes = Router();

urlRoutes.post("/short", authenticateJWT, shortUrlHandle);

export default urlRoutes;
