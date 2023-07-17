import { UUIDGenerator } from "./UUIDGenerator";

class PaymentMethod {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly value: string,
  ) {}

  static create(paymentMethod: { type: string; value: string }) {
    const id = UUIDGenerator.create();

    return new PaymentMethod(id, paymentMethod.type, paymentMethod.value);
  }
}

export { PaymentMethod };
