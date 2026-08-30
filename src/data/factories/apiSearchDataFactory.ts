import { faker } from "@faker-js/faker"

/*
 * Generates fake data used by API tests 
 */

export class apiSearchDataFactory{

    static generateNonExistingUserQuery(): string{
        return `non-existing-user-${faker.string.uuid()}`;
    }
}