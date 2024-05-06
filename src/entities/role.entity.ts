import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { user } from './user.entity';

@Entity()
export class role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    code: string;

    @Column({ type: 'varchar', length: 100})
    name: string;

    @Column({type:'boolean'})
    status:boolean

    @Column({ type: 'varchar', length: 100, nullable: true })
    created_by: string;

    @CreateDateColumn({ type: 'date', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    update_by: string;

    @CreateDateColumn({ type: 'date', name: 'update_at' })
    update_at: Date;
}
