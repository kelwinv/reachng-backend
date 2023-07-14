class PaymentMethod {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly value: string,
  ) {}
}

export { PaymentMethod };
