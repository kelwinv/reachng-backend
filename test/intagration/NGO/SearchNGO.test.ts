import { SearchNGO } from "Application/useCase/SearchNGO";
import { Category } from "Domains/Entities/Category";
import { NGO } from "Domains/Entities/NGO";
import { CategoryRepository } from "Domains/repository/CategoryRepository";
import { NGORepository } from "Domains/repository/NGORepository";
import { CategoryInMemoryRepository } from "Infra/repository/memory/CategoryInMemoryRepository";
import { NGOInMemoryRepository } from "Infra/repository/memory/NGOInMemoryRepository";

describe("SearchNGO", () => {
  let ngoRepository: NGORepository;
  let categoryRepository: CategoryRepository;
  let categories: Category[];
  let ngos: NGO[];

  beforeAll(async () => {
    ngoRepository = new NGOInMemoryRepository();
    categoryRepository = new CategoryInMemoryRepository();

    categories = [
      Category.create({
        name: "socialServices",
        description:
          "NGOs providing assistance and support to individuals and communities in need.",
      }),
      Category.create({
        name: "Health",
        description: "NGOs focused on promoting and improving public health.",
      }),
    ];

    ngos = [
      NGO.create({
        name: "Helping Hands",
        mission:
          "Our mission is to provide support to underprivileged communities.",
        projects: ["Community Development", "Education"],
        address: "123 Main Street, City",
        category: categories[0],
        contacts: [
          { type: "mail", value: "info@helpinghands.org" },
          { type: "phone", value: "11234567890" },
        ],
        specificNeeds: ["School supplies", "Volunteers"],
        externalPaymentMethods: [
          { type: "PayPal", value: "paypal@helpinghands.org" },
        ],
      }),
      NGO.create({
        name: "Green Earth",
        mission:
          "We aim to protect the environment and promote sustainable practices.",
        projects: ["Environmental Conservation", "Climate Action"],
        address: "456 Park Avenue, City",
        category: categories[0],
        contacts: [
          { type: "mail", value: "info@greenearth.org" },
          { type: "phone", value: "32 87654-3210" },
        ],
        specificNeeds: ["Recycling programs", "Tree planting"],
        externalPaymentMethods: [
          { type: "Bank Transfer", value: "Account number: XXXXXXXX" },
        ],
      }),
      NGO.create({
        name: "Health Aid",
        mission:
          "We strive to improve access to healthcare for marginalized communities.",
        projects: ["Healthcare", "Medical Supplies"],
        address: "789 Elm Street, City",
        category: categories[1],
        contacts: [
          { type: "mail", value: "info@healthaid.org" },
          { type: "phone", value: "55-911234567" },
        ],
        specificNeeds: ["Medicines", "Medical equipment"],
        externalPaymentMethods: [
          { type: "Credit Card", value: "Visa ending in 1234" },
        ],
      }),
    ];

    await categoryRepository.saveMany(categories);
    await ngoRepository.saveMany(ngos);
  });

  test("should be paginated results of NGO", async () => {
    const page = 1;
    const pageSize = 2;

    const searchNGO = new SearchNGO(ngoRepository);

    const output = await searchNGO.execute({ page, pageSize });

    expect(output.ngos).toHaveLength(2);
    expect(output.page).toBe(1);
    expect(output.pageSize).toBe(2);
    expect(output.totalPages).toBe(2);

    for (const ngo of output.ngos) {
      expect(ngo).toBeInstanceOf(NGO);
    }
  });

  test("should return paginated results on different page", async () => {
    const page = 2;
    const pageSize = 2;

    const searchNGO = new SearchNGO(ngoRepository);

    const output = await searchNGO.execute({ page, pageSize });

    expect(output.ngos).toHaveLength(1);
    expect(output.page).toBe(page);
    expect(output.pageSize).toBe(pageSize);

    for (const ngo of output.ngos) {
      expect(ngo).toBeInstanceOf(NGO);
    }
  });

  test("should be paginated results with category of NGO", async () => {
    const page = 1;
    const pageSize = 10;
    const categoryFilter = categories[0];
    const expectedNGOs = ngos
      .filter((ngo) => ngo.category.id === categoryFilter.id)
      .sort((a, b) => a.name.localeCompare(b.name));

    const searchNGO = new SearchNGO(ngoRepository);
    const output = await searchNGO.execute({
      page,
      pageSize,
      filter: { categoryId: categories[0].id },
    });

    expect(output.ngos).toHaveLength(expectedNGOs.length);

    for (const ngo of output.ngos) {
      expect(ngo.category.name).toBe(categoryFilter.name);
    }
    const sortNGOs = output.ngos.sort((a, b) => a.name.localeCompare(b.name));

    expect(sortNGOs).toEqual(expectedNGOs);

    expect(output.page).toBe(page);
    expect(output.pageSize).toBe(pageSize);
    expect(output.totalPages).toBe(1);
  });

  test("should be return empty if category is not found", async () => {
    const searchNGO = new SearchNGO(ngoRepository);
    const output = await searchNGO.execute({
      page: 10,
      pageSize: 10,
      filter: { categoryId: "" },
    });

    expect(output.ngos).toHaveLength(0);
  });

  afterAll(async () => {
    await ngoRepository.deleteMany(ngos);
  });
});
