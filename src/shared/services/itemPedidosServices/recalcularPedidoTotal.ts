import { AppDataSource } from "../../typeorm/data-source";
import ItemPedidos from "../../typeorm/entities/ItemPedidos";
import Pedidos from "../../typeorm/entities/Pedidos";

export async function recalcularPedidoTotal(pedidoId: string) {
  if (!pedidoId) {
    return;
  }

  const itemRepo = AppDataSource.getRepository(ItemPedidos);
  const pedidoRepo = AppDataSource.getRepository(Pedidos);

  const pedido = await pedidoRepo.findOneBy({ id: pedidoId });

  if (!pedido) {
    return;
  }

  const itens = await itemRepo.find({
    where: { pedido: { id: pedidoId } },
  });

  const total = itens.reduce((acc, item) => {
    const subtotal = Number(item.subtotal ?? 0);
    return acc + subtotal;
  }, 0);

  pedido.valor_total = Number(total.toFixed(2));
  await pedidoRepo.save(pedido);
}
