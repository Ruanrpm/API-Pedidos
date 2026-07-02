import AppError from "../../errors/AppError";
import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";
import Pedidos from "../../typeorm/entities/Pedidos";
import { recalcularPedidoTotal } from "./recalcularPedidoTotal";

interface IRequest {
  pedido_id: string;
  nome_item: string;
  quantidade: number;
  preco_unitario: number;
  observacao?: string;
  tamanho?: string;
}

export default class CreateItemPedidosService {
  public async execute({
    pedido_id,
    nome_item,
    quantidade,
    preco_unitario,
    observacao,
    tamanho,
  }: IRequest): Promise<ItemPedidos> {
    const itemPedidosRepository = AppDataSource.getRepository(ItemPedidos);
    const pedidosRepository = AppDataSource.getRepository(Pedidos);

    const pedido = await pedidosRepository.findOne({
      where: { id: pedido_id },
    });

    if (!pedido) {
      throw new AppError("Pedido não encontrado.");
    }

    if (!nome_item || !nome_item.trim()) {
      throw new AppError("Nome do item é obrigatório.");
    }

    const quantidadeNumber = Number(quantidade);
    const precoUnitarioNumber = Number(preco_unitario);

    if (!Number.isFinite(quantidadeNumber) || quantidadeNumber <= 0) {
      throw new AppError("Quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(precoUnitarioNumber) || precoUnitarioNumber <= 0) {
      throw new AppError("Preço unitário deve ser maior que zero.");
    }

    const itemPedidoExists = await itemPedidosRepository.findOne({
      where: {
        pedido: { id: pedido_id },
        nome_item,
      },
      relations: ["pedido"],
    });

    if (itemPedidoExists) {
      throw new AppError("Já existe um item com esse nome neste pedido.");
    }

    const subtotal = Number((quantidadeNumber * precoUnitarioNumber).toFixed(2));

    const itemPedidoData: Partial<ItemPedidos> = {
        pedido,
        nome_item,
        quantidade: quantidadeNumber,
        preco_unitario: precoUnitarioNumber,
        subtotal,
    };

    if (observacao !== undefined) {
        itemPedidoData.observacao = observacao;
    }

    if (tamanho !== undefined) {
        itemPedidoData.tamanho = tamanho;
    }

const itemPedido = itemPedidosRepository.create(itemPedidoData);

    await itemPedidosRepository.save(itemPedido);
    await recalcularPedidoTotal(pedido_id);

    return itemPedido;
  }
}