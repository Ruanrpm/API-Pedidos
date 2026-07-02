import { Router } from 'express';
import ItemPedidosController from '../controllers/ItemPedidosController';

const itemPedidosRouter = Router();
const itemPedidosController = new ItemPedidosController();

itemPedidosRouter.get('/', async (req, res, next) => {
  try {
    await itemPedidosController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

itemPedidosRouter.get('/:id', async (req, res, next) => {
  try {
    await itemPedidosController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

itemPedidosRouter.post('/', async (req, res, next) => {
  try {
    await itemPedidosController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

itemPedidosRouter.put('/:id', async (req, res, next) => {
  try {
    await itemPedidosController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

itemPedidosRouter.delete('/:id', async (req, res, next) => {
  try {
    await itemPedidosController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default itemPedidosRouter;