import {IsEmail} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({type: 'text', unique: true})
  @IsEmail()
  email: string | null;

  @Column({type: 'boolean', default: false})
  verifiedEmail: boolean;

  @Column({type: 'text'})
  firstName: string;

  @Column({type: 'text'})
  lastName: string;

  @Column({type: 'int', nullable: true})
  age: number;

  @Column({type: 'text', nullable: true})
  password: string;

  @Column({type: 'text', nullable: true})
  phoneNumber: string;

  @Column({type: 'boolean', default: false})
  verifiedPhoneNumber: boolean;

  @Column({type: 'text'})
  profilePhoto: string;

  @Column({type: 'boolean', default: false})
  isDriving: boolean;

  @Column({type: 'boolean', default: false})
  isRiding: boolean;

  @Column({type: 'boolean', default: false})
  isTaken: boolean;

  @Column({type: 'double precision', default: 0})
  lastLng: number;

  @Column({type: 'double precision', default: 0})
  lastLat: number;

  @Column({type: 'double precision', default: 0})
  lastOrientation: number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}

export default User;
