import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.model';

@Entity()
export class Discution extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatter1: number; // User['id']

  @Column()
  chatter2: number; // User['id']

  @OneToMany(() => Message, (message) => message.discution)
  messages: Message[];
}
