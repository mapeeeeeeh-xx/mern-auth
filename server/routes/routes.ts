import { Request, Response, Router } from "express";
import { userCont } from "../controllers/userController";
import { signin, userSignUp } from "../controllers/userAuth";
import { signUpMiddleware } from "../middlewares";

export const routes = Router();

routes.get("/user", userCont);
routes.post("/auth/signup", signUpMiddleware, userSignUp);
routes.post("/auth/signin", signin);
