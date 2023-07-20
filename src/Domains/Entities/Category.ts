import { UUIDGenerator } from "./UUIDGenerator";

class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
  ) {
    this.validate();
  }

  validate() {
    if (!this.name) throw new Error("name cannot be empty");
    if (!this.description) throw new Error("description cannot be empty");
  }

  static create({ name, description }: { name: string; description: string }) {
    const id = UUIDGenerator.create();
    return new Category(id, name, description);
  }
}

export { Category };
