import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Pedidos from "./entities/Pedidos";
import ItemPedidos from "./entities/ItemPedidos";







export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost", // se Node está fora do Docker
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "pedidos",
    // password: "docker",
    // database: "postgres",
    synchronize: true, // sempre false em produção/migrations
    logging: true,
    entities: [Pedidos, ItemPedidos],
    migrations: [path.join(__dirname, 'migrations', '*.js')],
    subscribers: [],
});