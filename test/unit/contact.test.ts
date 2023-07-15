import { Contact } from "Domains/Entities/Contact";
import { UUIDGenerator } from "Domains/Entities/UUIDGenerator";

describe("Contact", () => {
  test("should accept valid contact types", () => {
    const validTypes = [
      { type: "mail", value: "contact@domain.com" },
      // { type: "phone", value: "11 99999-9999" },
      { type: "social", value: "https://localhost/social" },
    ];

    validTypes.forEach(({ type, value }) => {
      const createContactWithValidType = () => {
        return Contact.create({ type, value });
      };

      expect(createContactWithValidType).not.toThrow();
      expect(createContactWithValidType()).toHaveProperty("type", type);
    });
  });

  test("should create contact with same id", () => {
    const id = UUIDGenerator.create();
    const contact = new Contact(id, "mail", "contact@domain.com");

    expect(contact.id).toBe(id);
    expect(contact).toHaveProperty("type");
    expect(contact).toHaveProperty("value");
  });

  test("should create contact with a new id", () => {
    const contact = Contact.create({
      type: "mail",
      value: "contact@domain.com",
    });

    expect(contact).toHaveProperty("id");
    expect(contact).toHaveProperty("type");
    expect(contact).toHaveProperty("value");
  });

  test("should throw an error if an invalid contact type is used", () => {
    const createContactWithInvalidType = () => {
      Contact.create({
        type: "InvalidType",
        value: "contact@domain.com",
      });
    };

    expect(createContactWithInvalidType).toThrow(
      "Invalid contact type: InvalidType",
    );
  });

  test("should throw an error if the value has an invalid format", () => {
    const validTypes = [
      { type: "mail", value: "contact domain.com" },
      { type: "phone", value: "11 9999999" },
      { type: "social", value: "localhost social" },
    ];

    validTypes.forEach(({ type, value }) => {
      const createContactWithInvalidFormat = () => {
        return Contact.create({ type, value });
      };
      expect(createContactWithInvalidFormat).toThrow(
        `Invalid ${type} contact value format`,
      );
    });
  });
});
