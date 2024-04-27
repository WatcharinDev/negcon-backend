import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn, Timestamp } from 'typeorm';

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

  @Column({ type: 'varchar', length: 10, nullable: true })
  role_code: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  role_name: string;

  @CreateDateColumn({ type: 'date', name: 'birthday' })
  birthday: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tel: string;

  @Column({ type: 'text' })
  introduction: string;
}