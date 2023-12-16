import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 36, unique: true })
    role_code: string;

    @Column({ type: 'varchar', length: 36})
    role_name: string;

    @Column({type:'boolean'})
    status:boolean

    @Column({ type: 'varchar', length: 30, nullable: true, name: 'created_by' })
    created_by: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'varchar', length: 30, nullable: true, name: 'update_by' })
    update_by: string;

    @CreateDateColumn({ type: 'timestamp', name: 'update_at' })
    update_at: Date;
}
