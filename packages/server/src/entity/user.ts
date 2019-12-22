import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
