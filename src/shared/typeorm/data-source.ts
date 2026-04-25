import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Pedidos from "./entities/Pedidos";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost", // se Node está fora do Docker
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "postgres",
    synchronize: false, // sempre false em produção/migrations
    logging: true,
    entities: [Pedidos],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")],
    subscribers: [],
});