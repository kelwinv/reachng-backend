import { Category } from "./Category";

class NGO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly mission: string,
    readonly projects: string[],
    readonly address: string,
    readonly category: Category,
    readonly contact: {
      type: string;
      value: string;
    }[],
    readonly specificNeeds?: string[],
    readonly externalPaymentMethod?: {
      type: string;
      value: string;
    },
  ) {}
}

export { NGO };
