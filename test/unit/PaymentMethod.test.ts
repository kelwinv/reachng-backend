import { PaymentMethod } from "Domains/Entities/PaymentMethod";
import { UUIDGenerator } from "Domains/Entities/UUIDGenerator";

describe("PaymentMethod", () => {
  test("should create paymentMethod with same id", () => {
    const id = UUIDGenerator.create();
    const paymentMethod = new PaymentMethod(id, "type", "value");

    expect(paymentMethod.id).toBe(id);
    expect(paymentMethod).toHaveProperty("type");
    expect(paymentMethod).toHaveProperty("value");
  });

  test("should create paymentMethod with a new id", () => {
    const paymentMethod = PaymentMethod.create({
      type: "payment Method",
      value: "value",
    });

    expect(paymentMethod).toHaveProperty("id");
    expect(paymentMethod).toHaveProperty("type");
    expect(paymentMethod).toHaveProperty("value");
  });
});
