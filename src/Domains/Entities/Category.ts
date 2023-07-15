import { UUIDGenerator } from "./UUIDGenerator";

class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
  ) {}

  static create({ name, description }: { name: string; description: string }) {
    const id = UUIDGenerator.create();
    return new Category(id, name, description);
  }
}

export { Category };
