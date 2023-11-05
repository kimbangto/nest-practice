import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'auth_table' })
export class Auth {
  @PrimaryColumn()
  userEmail: string;

  @Column()
  authCode: string;

  @Column({ type: 'datetime', default: () => 'now() + interval 30 minute' })
  authEffectiveDate: Date;

  @Column({ default: 'ready' })
  authStatus: string;
}
