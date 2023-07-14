import { Contact } from "Domains/Entities/Contact";

describe("Contact", () => {
  test("should accept valid contact types", () => {
    const validTypes = ["mail", "phone", "social"];

    validTypes.forEach((type) => {
      const createContactWithValidType = () => {
        new Contact("1", type, "contact@domain.com");
      };

      expect(createContactWithValidType).not.toThrow();
    });
  });

  test("should throw an error if an invalid contact type is used", () => {
    const createContactWithInvalidType = () => {
      new Contact("1", "InvalidType", "contact@domain.com");
    };

    expect(createContactWithInvalidType).toThrow("Invalid contact type");
  });

  test("should throw an error if the value has an invalid format", () => {
    const createContactWithInvalidFormat = () => {
      new Contact("1", "mail", "invalid_email");
    };

    expect(createContactWithInvalidFormat).toThrow(
      "Invalid contact value format",
    );
  });
});
