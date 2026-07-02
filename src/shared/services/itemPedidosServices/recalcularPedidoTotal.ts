import { AppDataSource } from "@shared/typeorm/data-source";
import ItemPedidos from "@shared/typeorm/entities/ItemPedidos";
import Pedidos from "@shared/typeorm/entities/Pedidos";

export async function recalcularPedidoTotal(pedidoId: string) {
  const itemRepo = AppDataSource.getRepository(ItemPedidos);
  const pedidoRepo = AppDataSource.getRepository(Pedidos);

  const itens = await itemRepo.find({
    where: { pedido: { id: pedidoId } },
  });

  const total = itens.reduce((acc, item) => {
    return acc + Number(item.subtotal);
  }, 0);

  await pedidoRepo.update(pedidoId, {
    valor_total: total,
  });
}
