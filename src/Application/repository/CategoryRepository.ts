import { Category } from "Domains/Entities/Category";

interface CategoryRepository {
  saveMany(input: Category[]): Promise<void>;
  find(): Promise<Category[]>;
}

export { CategoryRepository };
