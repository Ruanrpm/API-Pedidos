import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import Pedidos from "../entities/Pedidos";

export default class PedidosRepository {
    private ormRepository: Repository<Pedidos>;
    constructor() {
        this.ormRepository = AppDataSource.getRepository(Pedidos);
    }
    public async findByNome(nome: string): Promise<Pedidos | null> {
        const pedido = await this.ormRepository.findOne({
            where: { nome },
        });
        return pedido;
    }
}