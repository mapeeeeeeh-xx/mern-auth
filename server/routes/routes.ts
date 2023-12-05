import { Request, Response, Router } from "express";
import { userCont } from "../controllers/userController";
import { userSignUp } from "../controllers/userAuth";

export const routes = Router();

routes.get("/user", userCont);
routes.post("/auth/signup", userSignUp);
