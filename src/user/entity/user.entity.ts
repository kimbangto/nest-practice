import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_table' })
export class User {
  @PrimaryGeneratedColumn()
  userNo: number;

  @Column()
  userEmail: string;

  @Column()
  userPassword: string;

  @Column()
  userNickname: string;

  @Column({ nullable: true })
  profileUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column({ type: 'boolean', nullable: true })
  notice: boolean;
}
