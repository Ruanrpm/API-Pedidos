import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemPedidos1782951573286 implements MigrationInterface {
    name = 'CreateItemPedidos1782951573286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item_pedidos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome_item" character varying NOT NULL, "quantidade" integer NOT NULL, "preco_unitario" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "observacao" character varying, "tamanho" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pedido_id" uuid NOT NULL, CONSTRAINT "PK_80e1951572eeb61a8f2743f8bd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item_pedidos" ADD CONSTRAINT "FK_0e54ac4dcca6ced796991ab958d" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_pedidos" DROP CONSTRAINT "FK_0e54ac4dcca6ced796991ab958d"`);
        await queryRunner.query(`DROP TABLE "item_pedidos"`);
    }

}
