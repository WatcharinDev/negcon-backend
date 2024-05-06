import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, Timestamp, OneToMany } from 'typeorm';
import { post } from './post.entity';

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'text'})
  profile_img: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  last_name: string;

  @Column({ type: 'integer', nullable: true })
  role_id: number;

  @CreateDateColumn({ type: 'date', name: 'birthday' })
  birthday: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tel: string;

  @Column({ type: 'text' })
  introduction: string;

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