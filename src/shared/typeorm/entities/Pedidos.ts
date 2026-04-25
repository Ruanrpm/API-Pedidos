import {
 Column,
 CreateDateColumn,
 Entity,
 PrimaryGeneratedColumn,
 UpdateDateColumn
} from 'typeorm';

@Entity('pedidos')
export default class Pedidos{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column({ type: 'date' })
    data_pedido: Date;

    @Column()
    status: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor_total: number;

    @Column()
    forma_pagamento: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}