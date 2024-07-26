import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from './user.entity';
import { PropertyType } from './propertyType.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedBy: User[];

  @ManyToOne(() => PropertyType)
  type: PropertyType;
}
