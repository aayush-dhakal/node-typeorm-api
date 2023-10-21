import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // no name for table as we will not be creating any table of this entity. It is just for inheritance
export class Person extends BaseEntity {
  // we need to extend BaseEntity to perfrom CRUD operation
  @PrimaryGeneratedColumn()
  id: number;
  // or define as uuid
  // @PrimaryGeneratedColumn({
  //   type:"uuid"
  // })
  // id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10, // this constraint kinda acts like a validation. And length is only allowed for string data type
  })
  card_number: string; // you cannot use dash(-) to define column names like card-number is not valid
}
