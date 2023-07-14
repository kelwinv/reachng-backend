import { SearchNGO } from "../../../src/Application/useCase/SearchNGO";
import { Category } from "../../../src/Domains/Entities/Category";
import { Contact } from "../../../src/Domains/Entities/Contact";
import { NGO } from "../../../src/Domains/Entities/NGO";
import { PaymentMethod } from "../../../src/Domains/Entities/PaymentMethod";
import { NGOInMemoryRepository } from "../../../src/Infra/repository/memory/NGOInMemoryRepository";

describe("SearchNGO", () => {
  const ngoRepository = new NGOInMemoryRepository();
  const categories: Category[] = [
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

  beforeAll(() => {
    const ngos: NGO[] = [
      new NGO(
        "1",
        "Helping Hands",
        "Our mission is to provide support to underprivileged communities.",
        ["Community Development", "Education"],
        "123 Main Street, City",
        categories[0],
        [
          new Contact("1", "Email", "info@helpinghands.org"),
          new Contact("1", "Phone", "123-456-7890"),
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
          new Contact("3", "Email", "info@greenearth.org"),
          new Contact("4", "Phone", "987-654-3210"),
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
          new Contact("5", "Email", "info@healthaid.org"),
          new Contact("6", "Phone", "555-123-4567"),
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
          new Contact("7", "Email", "info@educationforall.org"),
          new Contact("8", "Phone", "222-333-4444"),
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
          new Contact("1", "Email", "info@animalrescue.org"),
          new Contact("1", "Phone", "999-888-7777"),
        ],
        ["Pet food", "Medical supplies"],
        new PaymentMethod("5", "Venmo", "@animalrescue"),
      ),
    ];

    ngoRepository.NGOs = ngos;
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

    const output2 = await searchNGO.execute({ page: 3, pageSize });

    expect(output2.ngos).toHaveLength(1);
    expect(output2.page).toBe(3);
    expect(output2.pageSize).toBe(2);
  });

  test("should be paginated results with category of NGO", async () => {
    const page = 1;
    const pageSize = 10;
    const searchNGO = new SearchNGO(ngoRepository);
    const output = await searchNGO.execute({
      page,
      pageSize,
      filter: { category: categories[0] },
    });

    expect(output.ngos).toHaveLength(2);
    expect(output.page).toBe(1);
    expect(output.totalPages).toBe(1);

    const [NGO1, NGO2] = output.ngos;

    expect(NGO1.category).toBe(categories[0]);
    expect(NGO2.category).toBe(categories[0]);
  });
});
