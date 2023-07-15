import { Category } from "./Category";
import { Contact } from "./Contact";
import { PaymentMethod } from "./PaymentMethod";

class NGO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly mission: string,
    readonly projects: string[],
    readonly address: string,
    readonly category: Category,
    readonly contact: Contact[],
    readonly specificNeeds?: string[],
    readonly externalPaymentMethod?: PaymentMethod,
  ) {}
}

export { NGO };
