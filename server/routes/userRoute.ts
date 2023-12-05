import { Request, Response, Router } from "express";
import { userCont } from "../controllers/userController";

const routes = Router();

routes.get("/api/user", userCont);

export default routes;
