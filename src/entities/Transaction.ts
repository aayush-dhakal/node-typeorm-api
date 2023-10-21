import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Client } from "./Client";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  //  This ManyToOne decorator specifies that a "Transaction" belongs to one "Client." It establishes a many-to-one relationship, where many transactions can be associated with one client.
  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: "CASCADE", // when a client is deleted, all of their associated transactions should also be deleted
  })
  @JoinColumn({
    // This JoinColumn decorator is used to specify the name of the foreign key column in the "Transaction" table that links to the "Client" table. In this case, it's named "client_id."
    name: "client_id", // so there will be a column named client_id inside transaction table
  })
  client: Client; // Client is for column reference and client is the foreign key. This is a property in the "Transaction" entity that represents the related client. It will be populated with the corresponding "Client" entity when you retrieve a "Transaction" from the database.

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
