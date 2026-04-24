import {
 Column,
 CreateDateColumn,
 Entity,
 PrimaryGeneratedColumn,
 UpdateDateColumn
} from 'typeorm';

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column({unique: true})
    email: string;

    @Column('int')
    senha: number;

    @Column('int')
    telefone: number;

    @Column()
    endereco: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}