import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discution } from './discution.model';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator: number; // User['id']

  @Column()
  to: number; // User['id']

  @Column()
  content: string;

  @ManyToOne(() => Discution, (discution) => discution.messages)
  discution: Discution;
}
