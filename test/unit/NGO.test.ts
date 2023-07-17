import { Category } from "Domains/Entities/Category";
import { Contact } from "Domains/Entities/Contact";
import { NGO } from "Domains/Entities/NGO";
import { PaymentMethod } from "Domains/Entities/PaymentMethod";
import { UUIDGenerator } from "Domains/Entities/UUIDGenerator";

describe("NGO", () => {
  let category: Category;
  let contacts: Contact[];
  let externalPaymentMethods: PaymentMethod[];

  beforeAll(() => {
    category = Category.create({
      name: "category name",
      description: "category description",
    });
    contacts = [
      Contact.create({
        type: "phone",
        value: "11 989581779",
      }),
    ];
    externalPaymentMethods = [
      PaymentMethod.create({
        type: "pix",
        value: "chave pix",
      }),
    ];
  });

  test("should create ngo with same id", () => {
    const id = UUIDGenerator.create();

    const ngo = new NGO(
      id,
      "name",
      "mission",
      ["project1", "project2", "project3"],
      "address",
      category,
      contacts,
      ["specific need1", "specific need2"],
      externalPaymentMethods,
    );

    expect(ngo.id).toBe(id);
    expect(ngo).toHaveProperty("name");
    expect(ngo).toHaveProperty("mission");

    expect(ngo.projects).toHaveLength(3);
    expect(ngo).toHaveProperty("address");
    expect(ngo.category).toBeInstanceOf(Category);
    expect(ngo.contacts).toBeInstanceOf(Array<Contact>);
    expect(ngo.specificNeeds).toHaveLength(2);
    expect(ngo.externalPaymentMethods).toBeInstanceOf(Array<PaymentMethod>);
  });

  test("should create ngo with a new id", () => {
    const ngo = NGO.create({
      name: "name",
      mission: "mission",
      projects: ["project1", "project2", "project3"],
      address: "address",
      category: category,
      contacts: [
        { type: "phone", value: "11 989581779" },
        { type: "mail", value: "email@example.com" },
      ],
      specificNeeds: ["specific need1", "specific need2"],
      externalPaymentMethods: externalPaymentMethods,
    });

    expect(ngo).toHaveProperty("id");
    expect(ngo).toHaveProperty("name");
    expect(ngo).toHaveProperty("mission");

    expect(ngo.projects).toHaveLength(3);
    expect(ngo).toHaveProperty("address");
    expect(ngo.category).toBeInstanceOf(Category);
    expect(ngo.contacts).toBeInstanceOf(Array<Contact>);
    expect(ngo.specificNeeds).toHaveLength(2);
    expect(ngo.externalPaymentMethods).toBeInstanceOf(Array<PaymentMethod>);
  });
});
