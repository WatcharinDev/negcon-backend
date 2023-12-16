import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 36, unique: true })
    post_id: string;

    @Column({ type: 'varchar', length: 36})
    user_code: string;

    @Column({ type: 'text' }) // Change type to 'text' for JSON data
    content: string;

    @Column({ type: 'text', nullable: true }) // Change type to 'text' for JSON data
    images: string; // Serialize the array to a JSON string

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
