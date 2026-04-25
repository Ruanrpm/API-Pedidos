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
        id: Joi.string().uuid().required().messages({
            'any.required': 'O ID é obrigatório.',
            'string.uuid': 'O ID deve ser um UUID válido.'
        }),
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
        nome: Joi.string().required().messages({
            'string.empty': 'O campo nome não pode estar vazio.',
            'any.required': 'O campo nome é obrigatório.'
        }),
        data_pedido: Joi.date().required().messages({
            'date.base': 'O campo data_pedido deve ser uma data válida.',
            'any.required': 'O campo data_pedido é obrigatório.'
        }),
        status: Joi.string().required().messages({
            'string.empty': 'O campo status não pode estar vazio.',
            'any.required': 'O campo status é obrigatório.'
        }),
        valor_total: Joi.number().precision(2).required().messages({
            'number.base': 'O campo valor_total deve ser um número.',
            'any.required': 'O campo valor_total é obrigatório.'
        }),
        forma_pagamento: Joi.string().required().messages({
            'string.empty': 'O campo forma_pagamento não pode estar vazio.',
            'any.required': 'O campo forma_pagamento é obrigatório.'
        }),
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
        id: Joi.string().uuid().required().messages({
            'any.required': 'O ID é obrigatório.',
            'string.uuid': 'O ID deve ser um UUID válido.'
        }),
    },
    [Segments.BODY]: {
        nome: Joi.string().required().messages({
            'string.empty': 'O campo nome não pode estar vazio.',
            'any.required': 'O campo nome é obrigatório.'
        }),
        data_pedido: Joi.date().required().messages({
            'date.base': 'O campo data_pedido deve ser uma data válida.',
            'any.required': 'O campo data_pedido é obrigatório.'
        }),
        status: Joi.string().required().messages({
            'string.empty': 'O campo status não pode estar vazio.',
            'any.required': 'O campo status é obrigatório.'
        }),
        valor_total: Joi.number().precision(2).required().messages({
            'number.base': 'O campo valor_total deve ser um número.',
            'any.required': 'O campo valor_total é obrigatório.'
        }),
        forma_pagamento: Joi.string().required().messages({
            'string.empty': 'O campo forma_pagamento não pode estar vazio.',
            'any.required': 'O campo forma_pagamento é obrigatório.'
        }),
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
        id: Joi.string().uuid().required().messages({
            'any.required': 'O ID é obrigatório.',
            'string.uuid': 'O ID deve ser um UUID válido.'
        }),
    },
}), async (req, res, next) => {
    try {
        await pedidosController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default pedidosRouter;