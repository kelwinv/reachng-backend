import { Utils } from "Application/Utils";
import { UUIDGenerator } from "./UUIDGenerator";

class Contact {
  private static readonly VALID_TYPES = ["mail", "phone", "social"];

  constructor(
    readonly id: string,
    readonly type: string,
    readonly value: string,
  ) {
    Contact.isValidType(type);
    Contact.isValidFormat(type, value);
  }

  private static isValidType(type: string): void {
    if (!Contact.VALID_TYPES.includes(type)) {
      throw new Error(`Invalid contact type: ${type}`);
    }
  }

  private static isValidFormat(type: string, value: string): void {
    if (type === "mail") {
      if (!Utils.isEmailValidFormat(value)) {
        throw new Error("Invalid mail contact value format");
      }
    }

    if (type === "phone") {
      const cleanedValue = value.replace(/\D/g, "");
      const phoneRegex = /^\d{11}$/;
      if (!phoneRegex.test(cleanedValue)) {
        throw new Error("Invalid phone contact value format");
      }
      value = cleanedValue;
    }

    if (type === "social") {
      const urlRegex = /^(https?:\/\/)?[^\s/$.?#].[^\s]*$/;

      if (!urlRegex.test(value)) {
        throw new Error("Invalid social contact value format");
      }
    }
  }

  static create({ type, value }: { type: string; value: string }) {
    const id = UUIDGenerator.create();

    return new Contact(id, type, value);
  }
}

export { Contact };
