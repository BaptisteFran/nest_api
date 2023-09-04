import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  // à faire dans un subscriber (voir typeorm)
  @BeforeInsert()
  cryptPassword() {
    bcrypt.hash(this.password, 10).then((res) => {
      this.password = res;
    });
  }
}
