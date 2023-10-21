import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";
import { Person } from "./utils/Person";
@Entity("client") // client will be the name of our table
export class Client extends Person {
  @Column({
    type: "numeric",
    // In TypeORM, the numeric type is used to represent numeric data in your database schema. It is commonly used to store decimal or floating-point numbers. Depending on the database system you are using, the actual SQL data type that corresponds to numeric can vary.
    // For example, in PostgreSQL, numeric corresponds to the "NUMERIC" data type, which is used to store arbitrary precision numbers with a user-specified precision and scale. In other database systems like MySQL, you might use DECIMAL or FLOAT to achieve similar functionality.
  })
  balance: number;

  @Column({
    default: true, // the default value is set to true
    name: "active", // if you want to give your column a different name like here if you want to name your column "active" and not is_active then use name property to override it
  })
  is_active: boolean;

  @Column({
    type: "simple-json", // for defining json data type
    nullable: true, // meaning this field is optional
  })
  additional_info: {
    age: number;
    hair_color: string;
  };

  @Column({
    type: "simple-array",
    default: [],
  })
  family_members: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // This OneToMany decorator establishes a one-to-many relationship from "Client" to "Transaction." It specifies that one client can have multiple transactions.
  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[]; // This is a property in the "Client" entity that represents an array of related transactions. When you retrieve a "Client" from the database, this property will contain all the transactions associated with that client. Note: the client table doesn't contain the transactions field(column) though. It is only used to retrieve relation transactions based on relation.
  // When you fetch a "Client" entity from the database using TypeORM, and you've defined this property, TypeORM will automatically populate this property with an array of related "Transaction" entities for that client. It provides a convenient way to navigate and work with related data in your application code. So, while there's no additional column in the "Client" table to represent the relationship, the transactions property in your entity class is a code-level representation of the relationship that TypeORM uses to retrieve and manage related data. It simplifies the process of working with related data in your application by allowing you to access related transactions directly through the "Client" entity.

  @ManyToMany((type) => Banker, {
    cascade: true,
  })
  bankers: Banker[];
}
