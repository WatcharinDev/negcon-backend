import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class temp_resetpassword {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    code_validate: string;

    @Column({ type: 'varchar', length: 100})
    email: string;

    @CreateDateColumn({ type: 'date', name: 'created_at' })
    created_at: Date;

}
