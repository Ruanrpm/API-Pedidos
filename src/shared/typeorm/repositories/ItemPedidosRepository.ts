import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import ItemPedidos from "../entities/ItemPedidos";

export default class ItemPedidosRepository {
    private ormRepository: Repository<ItemPedidos>;
    constructor() {
        this.ormRepository = AppDataSource.getRepository(ItemPedidos);
    }
    public async findByNome(nome_item: string): Promise<ItemPedidos | null> {
        const itemPedido = await this.ormRepository.findOne({
            where: { nome_item },
        });
        return itemPedido;
    }
}