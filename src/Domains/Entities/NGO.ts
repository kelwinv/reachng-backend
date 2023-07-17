import { Category } from "./Category";
import { Contact } from "./Contact";
import { PaymentMethod } from "./PaymentMethod";
import { UUIDGenerator } from "./UUIDGenerator";

class NGO {
  category: Category;
  contacts: Contact[];
  externalPaymentMethods: PaymentMethod[];

  constructor(
    readonly id: string,
    readonly name: string,
    readonly mission: string,
    readonly projects: string[],
    readonly address: string,
    category: { id: string; name: string; description: string },
    contacts: { id: string; type: string; value: string }[],
    readonly specificNeeds?: string[],
    externalPaymentMethods?: { id: string; type: string; value: string }[],
  ) {
    this.category = new Category(
      category.id,
      category.name,
      category.description,
    );
    this.contacts = contacts.map(
      (contact) => new Contact(contact.id, contact.type, contact.value),
    );

    if (externalPaymentMethods) {
      this.externalPaymentMethods = externalPaymentMethods.map(
        (externalPaymentMethod) =>
          new PaymentMethod(
            externalPaymentMethod.id,
            externalPaymentMethod.type,
            externalPaymentMethod.value,
          ),
      );
    } else {
      this.externalPaymentMethods = [];
    }
  }

  static create(ngo: NGOCreateType): NGO {
    const id = UUIDGenerator.create();
    const contacts = ngo.contacts.map((contact) =>
      Contact.create({
        type: contact.type,
        value: contact.value,
      }),
    );

    const externalPaymentMethods = ngo.externalPaymentMethods.map(
      (externalPaymentMethod) =>
        PaymentMethod.create({
          type: externalPaymentMethod.type,
          value: externalPaymentMethod.value,
        }),
    );

    return new NGO(
      id,
      ngo.name,
      ngo.mission,
      ngo.projects,
      ngo.address,
      ngo.category,
      contacts,
      ngo.specificNeeds,
      externalPaymentMethods,
    );
  }
}

type NGOCreateType = {
  category: Category;
  contacts: {
    type: string;
    value: string;
  }[];
  externalPaymentMethods: {
    type: string;
    value: string;
  }[];
  name: string;
  mission: string;
  projects: string[];
  address: string;
  specificNeeds: string[];
};

export { NGO };
