import { Column, Entity, ObjectID, ObjectIdColumn, BaseEntity } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public title: string;

  @Column()
  public description?: string;
}
