import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("testimonials")
export class Testimonial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  message!: string;

  @Column({ default: false })
  approved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
