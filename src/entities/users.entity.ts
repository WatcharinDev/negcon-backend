import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'varchar', length: 36, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  last_name: string;

  @Column({ type: 'integer', nullable: true })
  role_id: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  role_code: string;

  @CreateDateColumn({ type: 'timestamp', name: 'birthday' })
  birthday: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tel: string;

  @Column({ type: 'multilinestring', nullable: true })
  introduction: string;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'create_by' })
  created_by: string;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  created_at: Date;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'update_by' })
  update_by: string;

  @CreateDateColumn({ type: 'timestamp', name: 'update_at' })
  update_at: Date;
}