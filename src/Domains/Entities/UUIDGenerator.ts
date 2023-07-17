import crypto from "crypto";

class UUIDGenerator {
  static create() {
    return crypto.randomUUID();
  }
}

export { UUIDGenerator };
