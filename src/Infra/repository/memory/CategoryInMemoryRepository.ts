import { CategoryRepository } from "Application/repository/CategoryRepository";
import { Category } from "Domains/Entities/Category";

class CategoryInMemoryRepository implements CategoryRepository {
  readonly Categories: Category[];

  constructor() {
    this.Categories = [];
  }

  async find(): Promise<Category[]> {
    return new Promise<Category[]>((resolve) => {
      resolve(this.Categories);
    });
  }

  async saveMany(input: Category[]): Promise<void> {
    this.Categories.push(...input);
  }
}

export { CategoryInMemoryRepository };
