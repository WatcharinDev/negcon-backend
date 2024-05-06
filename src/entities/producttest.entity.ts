import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { user } from './user.entity';

@Entity()
export class producttest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    name: string;

    @Column({ type: 'text' })
    image: string;

    @Column({ type: 'integer'})
    price: number 
 
   
}
