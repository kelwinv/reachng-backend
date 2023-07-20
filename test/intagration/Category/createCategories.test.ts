import { CategoryRepository } from "Application/repository/CategoryRepository";
import { CreateCategories } from "Application/useCase/CreateCategories";
import { Category } from "Domains/Entities/Category";
import { CategoryInMemoryRepository } from "Infra/repository/memory/CategoryInMemoryRepository";

describe("createCategories", () => {
  let categoryRepository: CategoryRepository;

  beforeAll(() => {
    categoryRepository = new CategoryInMemoryRepository();
  });

  it("should create and save categories", async () => {
    const createCategories = new CreateCategories(categoryRepository);
    const categoriesToSave = [
      {
        name: "Assistência Social",
        description:
          "Atividades voltadas para ajudar pessoas em situação de vulnerabilidade social.",
      },
      {
        name: "Meio Ambiente",
        description:
          "Atividades relacionadas à proteção e preservação do meio ambiente e dos recursos naturais.",
      },
      {
        name: "Educação",
        description:
          "Atividades que visam promover a educação e o desenvolvimento intelectual de indivíduos.",
      },
      {
        name: "Saúde",
        description:
          "Atividades voltadas para a promoção da saúde e o bem-estar das pessoas.",
      },
      {
        name: "Cultura e Arte",
        description:
          "Atividades culturais e artísticas que promovem a diversidade cultural e a expressão criativa.",
      },
    ];

    await createCategories.execute({
      categories: categoriesToSave,
    });

    const categories = await categoryRepository.find();

    expect(categories).toHaveLength(categoriesToSave.length);

    for (const idx in categories) {
      const categoryToSave = categoriesToSave[idx];
      const category = categories[idx];

      expect(category).toBeInstanceOf(Category);

      expect(category).toHaveProperty("id");
      expect(category.name).toBe(categoryToSave.name);
      expect(category.description).toBe(categoryToSave.description);
    }
  });

  it("should be return error on try save without description", () => {
    const createCategories = new CreateCategories(categoryRepository);

    const categories = [{ name: "category1" }] as {
      name: string;
      description: string;
    }[];

    expect(
      createCategories.execute({
        categories,
      }),
    ).rejects.toThrow("description cannot be empty");
  });
});
