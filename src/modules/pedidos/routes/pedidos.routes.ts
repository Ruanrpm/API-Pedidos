import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PedidosController from '../controllers/PedidosController';


const pedidosRouter = Router();
const pedidosController = new PedidosController();

pedidosRouter.get('/', async (req, res, next) => {
    try {
        await pedidosController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

pedidosRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), async (req, res, next) => {
    try {
        await pedidosController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

pedidosRouter.post('/', celebrate({
    [Segments.BODY]: {
        nome: Joi.string().required(),
        data_pedido: Joi.date().required(),
        status: Joi.string().required(),
        valor_total: Joi.number().precision(2).required(),
        forma_pagamento: Joi.string().required(),
    },
}), async (req, res, next) => {
    try {
        await pedidosController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

pedidosRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        nome: Joi.string().required(),
        data_pedido: Joi.date().required(),
        status: Joi.string().required(),
        valor_total: Joi.number().precision(2).required(),
        forma_pagamento: Joi.string().required(),
    },
}), async (req, res, next) => {
    try {
        await pedidosController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

pedidosRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), async (req, res, next) => {
    try {
        await pedidosController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default pedidosRouter;