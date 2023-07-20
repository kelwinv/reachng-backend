import { CategoryRepository } from "Domains/repository/CategoryRepository";
import { Category } from "Domains/Entities/Category";

class CreateCategories {
  categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ categories }: createCategoriesType): Promise<void> {
    const categoriesToSave = categories.map((category) =>
      Category.create(category),
    );

    await this.categoryRepository.saveMany(categoriesToSave);
  }
}

type createCategoriesType = {
  categories: {
    name: string;
    description: string;
  }[];
};
export { CreateCategories };
