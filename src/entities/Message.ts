import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import Chat from "./Chat";
import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  chatId: number;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}

export default Message;
