import { SearchNGO } from "../../src/Application/useCase/SearchNGO";
import { NGO } from "../../src/Domains/Entities/NGO";
import { NGOInMemoryRepository } from "../../src/Infra/repository/memory/NGOInMemoryRepository";

describe("NGOUseCase", () => {
  const ngoRepository = new NGOInMemoryRepository();
  beforeAll(() => {
    const ngos: Array<typeof NGO.prototype> = [
      {
        id: "1",
        name: "Helping Hands",
        mission:
          "Our mission is to provide support to underprivileged communities.",
        projects: ["Community Development", "Education"],
        address: "123 Main Street, City",
        category: "Social Services",
        contact: [
          { type: "Email", value: "info@helpinghands.org" },
          { type: "Phone", value: "123-456-7890" },
        ],
        specificNeeds: ["School supplies", "Volunteers"],
        externalPaymentMethod: {
          type: "PayPal",
          value: "paypal@helpinghands.org",
        },
      },
      {
        id: "2",
        name: "Green Earth",
        mission:
          "We aim to protect the environment and promote sustainable practices.",
        projects: ["Environmental Conservation", "Climate Action"],
        address: "456 Park Avenue, City",
        category: "Social Services",
        contact: [
          { type: "Email", value: "info@greenearth.org" },
          { type: "Phone", value: "987-654-3210" },
        ],
        specificNeeds: ["Recycling programs", "Tree planting"],
        externalPaymentMethod: {
          type: "Bank Transfer",
          value: "Account number: XXXXXXXX",
        },
      },
      {
        id: "3",
        name: "Health Aid",
        mission:
          "We strive to improve access to healthcare for marginalized communities.",
        projects: ["Healthcare", "Medical Supplies"],
        address: "789 Elm Street, City",
        category: "Health",
        contact: [
          { type: "Email", value: "info@healthaid.org" },
          { type: "Phone", value: "555-123-4567" },
        ],
        specificNeeds: ["Medicines", "Medical equipment"],
        externalPaymentMethod: {
          type: "Credit Card",
          value: "Visa ending in 1234",
        },
      },
      {
        id: "4",
        name: "Education for All",
        mission:
          "Our mission is to provide quality education to underprivileged children.",
        projects: ["Education", "School Infrastructure"],
        address: "321 Oak Road, City",
        category: "Education",
        contact: [
          { type: "Email", value: "info@educationforall.org" },
          { type: "Phone", value: "222-333-4444" },
        ],
        specificNeeds: ["Books", "School furniture"],
        externalPaymentMethod: {
          type: "Cash",
          value: "Physical donations only",
        },
      },
      {
        id: "5",
        name: "Animal Rescue",
        mission:
          "We are dedicated to rescuing and rehabilitating animals in need.",
        projects: ["Animal Welfare", "Pet Adoption"],
        address: "555 Pine Avenue, City",
        category: "Animals",
        contact: [
          { type: "Email", value: "info@animalrescue.org" },
          { type: "Phone", value: "999-888-7777" },
        ],
        specificNeeds: ["Pet food", "Medical supplies"],
        externalPaymentMethod: { type: "Venmo", value: "@animalrescue" },
      },
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
      filter: { category: "Social Services" },
    });

    const [NGO1, NGO2] = output.ngos;

    expect(output.ngos).toHaveLength(2);
    expect(output.page).toBe(1);
    expect(output.totalPages).toBe(1);

    expect(NGO1.category).toBe("Social Services");
    expect(NGO2.category).toBe("Social Services");
  });
});
