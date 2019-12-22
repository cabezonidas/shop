import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
