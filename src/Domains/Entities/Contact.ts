class Contact {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      throw new Error("Invalid contact type");
    }
  }

  private static isValidFormat(type: string, value: string): void {
    if (type === "mail") {
      if (!Contact.EMAIL_REGEX.test(value)) {
        throw new Error("Invalid contact value format");
      }
    }
  }
}

export { Contact };
