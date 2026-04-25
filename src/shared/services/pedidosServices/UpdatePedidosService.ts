import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";
import Pedidos from "@shared/typeorm/entities/Pedidos";

interface IRequest {
  id: string;
  nome: string;
  data_pedido: Date;
  status: string;
  valor_total: number;
  forma_pagamento: string;
}

export default class UpdatePedidosService {
  public async execute({
    id,
    nome,
    data_pedido,
    status,
    valor_total,
    forma_pagamento,
  }: IRequest): Promise<Pedidos> {
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    const pedido = await pedidosRepository.findOneBy({ id });

    if (!pedido) {
      throw new AppError("Pedido not found.");
    }

    pedido.nome = nome;
    pedido.data_pedido = data_pedido;
    pedido.status = status;
    pedido.valor_total = valor_total;
    pedido.forma_pagamento = forma_pagamento;

    await pedidosRepository.save(pedido);

    return pedido;
  }
}