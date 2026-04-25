import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Pedidos from "@shared/typeorm/entities/Pedidos";

interface IRequest {
    nome: string;
    data_pedido: Date;
    status: string;
    valor_total: number;
    forma_pagamento: string;
}

export default class CreatePedidosService {
    public async execute({ nome, data_pedido, status, valor_total, forma_pagamento }: IRequest): Promise<Pedidos> {
        const pedidosRepository = AppDataSource.getRepository(Pedidos);

        const pedido = pedidosRepository.create({
            nome,
            data_pedido,
            status,
            valor_total,
            forma_pagamento,
        });

        await pedidosRepository.save(pedido);
        return pedido;
    }
}
