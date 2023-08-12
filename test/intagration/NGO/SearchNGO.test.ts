import { SearchNGO } from "Application/useCase/SearchNGO";
import { Category } from "Domains/Entities/Category";
import { Contact } from "Domains/Entities/Contact";
import { NGO } from "Domains/Entities/NGO";
import { PaymentMethod } from "Domains/Entities/PaymentMethod";
import { NGOInMemoryRepository } from "Infra/repository/memory/NGOInMemoryRepository";

describe("SearchNGO", () => {
  let ngoRepository: NGOInMemoryRepository;
  let categories: Category[];
  let ngos: NGO[];

  beforeAll(async () => {
    ngoRepository = new NGOInMemoryRepository();

    categories = [
      new Category(
        "1",
        "socialServices",
        "NGOs providing assistance and support to individuals and communities in need.",
      ),
      new Category(
        "2",
        "Health",
        "NGOs focused on promoting and improving public health.",
      ),
      new Category(
        "3",
        "Education",
        "NGOs dedicated to improving access to quality education for all individuals.",
      ),
      new Category(
        "4",
        "Animals",
        "NGOs working towards animal welfare, protection, and conservation.",
      ),
    ];

    ngos = [
      new NGO(
        "1",
        "Helping Hands",
        "Our mission is to provide support to underprivileged communities.",
        ["Community Development", "Education"],
        "123 Main Street, City",
        categories[0],
        [
          new Contact("1", "mail", "info@helpinghands.org"),
          new Contact("2", "phone", "123-456-7890"),
        ],
        ["School supplies", "Volunteers"],
        new PaymentMethod("1", "PayPal", "paypal@helpinghands.org"),
      ),
      new NGO(
        "2",
        "Green Earth",

        "We aim to protect the environment and promote sustainable practices.",
        ["Environmental Conservation", "Climate Action"],
        "456 Park Avenue, City",
        categories[0],
        [
          new Contact("3", "mail", "info@greenearth.org"),
          new Contact("4", "phone", "987-654-3210"),
        ],
        ["Recycling programs", "Tree planting"],
        new PaymentMethod("2", "Bank Transfer", "Account number: XXXXXXXX"),
      ),
      new NGO(
        "3",
        "Health Aid",

        "We strive to improve access to healthcare for marginalized communities.",
        ["Healthcare", "Medical Supplies"],
        "789 Elm Street, City",
        categories[1],
        [
          new Contact("5", "mail", "info@healthaid.org"),
          new Contact("6", "phone", "555-123-4567"),
        ],
        ["Medicines", "Medical equipment"],

        new PaymentMethod("3", "Credit Card", "Visa ending in 1234"),
      ),
      new NGO(
        "4",
        "Education for All",

        "Our mission is to provide quality education to underprivileged children.",
        ["Education", "School Infrastructure"],
        "321 Oak Road, City",
        categories[2],
        [
          new Contact("7", "mail", "info@educationforall.org"),
          new Contact("8", "phone", "222-333-4444"),
        ],
        ["Books", "School furniture"],
        new PaymentMethod("4", "Cash", "Physical donations only"),
      ),
      new NGO(
        "5",
        "Animal Rescue",

        "We are dedicated to rescuing and rehabilitating animals in need.",
        ["Animal Welfare", "Pet Adoption"],
        "555 Pine Avenue, City",
        categories[3],
        [
          new Contact("10", "mail", "info@animalrescue.org"),
          new Contact("11", "phone", "999-888-7777"),
        ],
        ["Pet food", "Medical supplies"],
        new PaymentMethod("5", "Venmo", "@animalrescue"),
      ),
    ];

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
    expect(output.totalPages).toBe(3);

    for (const ngo of output.ngos) {
      expect(ngo).toBeInstanceOf(NGO);
    }
  });

  test("should return paginated results on different page", async () => {
    const page = 3;
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
    const expectedNGOs = ngos.filter((ngo) => ngo.category === categoryFilter);

    const searchNGO = new SearchNGO(ngoRepository);
    const output = await searchNGO.execute({
      page,
      pageSize,
      filter: { category: categories[0] },
    });

    expect(output.ngos).toEqual(expectedNGOs);
    expect(output.page).toBe(page);
    expect(output.pageSize).toBe(pageSize);
    expect(output.totalPages).toBe(1);
  });

  afterAll(async () => {
    await ngoRepository.deleteMany(ngos);
  });
});
