import { faker } from "@faker-js/faker";

/**
 * Generates dynamic search data for negative search scenarios.
 *
 * The prefix makes the value highly unlikely to match
 * an existing product in the application.
 */

export class SearchDataFactory {
  static createNonExistingProductName(): string {
    return `NonExisting-${faker.string.alphanumeric(12)}`;
  }
}