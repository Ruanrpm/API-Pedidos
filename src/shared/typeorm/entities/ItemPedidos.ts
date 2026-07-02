import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

import Pedidos from './Pedidos';

@Entity ('item_pedidos')
export default class ItemPedidos {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Pedidos, pedido => pedido.itens, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'pedido_id'})
    pedido: Pedidos;

    @Column()
    nome_item: string;

    @Column('int')
    quantidade: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco_unitario: number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;

    @Column({nullable: true})
    observacao?: string;

    @Column({nullable: true})
    tamanho?: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;    
}