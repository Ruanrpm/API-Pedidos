import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePedidos1776995058633 implements MigrationInterface {
    name = 'CreatePedidos1776995058633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "data_pedido" date NOT NULL, "status" character varying NOT NULL, "valor_total" decimal(10,2) NOT NULL, "forma_pagamento" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_pedidos" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pedidos"`);
    }
}

