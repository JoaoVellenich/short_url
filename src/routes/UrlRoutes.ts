import { Router } from "express";
import { authRoute, authenticateJWT } from "../middlewares/token";
import { shortUrlHandle } from "../controllers/url/shortUrl/short";
import { listUrlHandle } from "../controllers/url/listUrls/listUrl";
import { deleteUrlHandle } from "../controllers/url/deleteUrl/deleteUrl";
import { getUrlById } from "../controllers/url/getUrlById/getUrlById";

const urlRoutes = Router();

// This route accepts both authenticated users and non-authenticated users
urlRoutes.post("/short", authenticateJWT, shortUrlHandle);

// This route only accepts authenticated users
urlRoutes.get("/list", authRoute, listUrlHandle);
urlRoutes.delete("/:id", authRoute, deleteUrlHandle);

urlRoutes.get("/:id", getUrlById);

export default urlRoutes;
