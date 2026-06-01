import "reflect-metadata";
import { DataSource } from "typeorm";
import { Testimonial } from "./entities/Testimonial";
import { CreateTestimonial1780352416000 } from "./migrations/1780352416000-CreateTestimonial";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307,
  username: process.env.DB_USER || process.env.DB_USERNAME,
  password: process.env.DB_PASS || process.env.DB_PASSWORD,
  database: process.env.DB_NAME || process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
  entities: [Testimonial],
  migrations: [CreateTestimonial1780352416000],
  subscribers: [],
});

export default AppDataSource;
