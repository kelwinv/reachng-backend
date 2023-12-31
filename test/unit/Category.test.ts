import { Category } from "Domains/Entities/Category";
import { UUIDGenerator } from "Domains/Entities/UUIDGenerator";

describe("Category", () => {
  test("should create category with same id", () => {
    const id = UUIDGenerator.create();
    const category = new Category(id, "mail", "category@domain.com");

    expect(category.id).toBe(id);
    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("description");
  });

  test("should create category with a new id", () => {
    const category = Category.create({
      name: "category name",
      description: "description",
    });

    expect(category).toHaveProperty("id");
    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("description");
  });

  test("must be error if description is empty", () => {
    expect(() => new Category("id", "category name", "")).toThrowError(
      "description cannot be empty",
    );
  });

  test("must be error if name is empty", () => {
    expect(() => new Category("id", "", "description")).toThrowError(
      "name cannot be empty",
    );
  });
});
