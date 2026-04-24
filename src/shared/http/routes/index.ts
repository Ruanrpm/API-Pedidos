import { response, Router } from "express";
import { request } from "node:http";
import userRouter from "@modules/users/routes/user.routes";


const routes = Router();
routes.use('/user', userRouter);

export default routes;