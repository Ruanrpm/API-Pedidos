import { response, Router } from "express";
import { request } from "node:http";
import pedidosRouter from "@modules/pedidos/routes/pedidos.routes";


const routes = Router();
routes.use('/pedidos', pedidosRouter);

export default routes;