import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from "./User";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'double precision', default: 0})
  lat: number;

  @Column({type: 'double precision', default: 0})
  lng: number;

  @Column({type: 'text'})
  address: string;

  @Column({type: 'boolean', default: false})
  isFav: boolean;

  @ManyToOne(type => User, user => user.places)
  user: User;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
export default Place;
