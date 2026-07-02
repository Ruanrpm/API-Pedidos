import { Router } from "express";
import pedidosRouter from "@modules/pedidos/routes/pedidos.routes";
import itemPedidosRouter from "@modules/itemPedidos/routes/itemPedidos.routes";


const routes = Router();
routes.use('/pedidos', pedidosRouter);
routes.use('/itemPedidos', itemPedidosRouter)

export default routes;