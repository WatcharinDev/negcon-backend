import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { user } from './user.entity';

@Entity()
export class post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    user_code: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'text',array:true, nullable: true })
    images: string[]; 
 
    @Column({ type: 'text',array:true, nullable: true })
    likes: string[]; 

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

    // @ManyToOne(() => user, user => user.code) // Many posts belong to one user
    // user: user;
}
