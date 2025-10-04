import { faker } from '@faker-js/faker';

export function generateOrderData() {
  const futureDate = faker.date.future();

  return {
    name: faker.person.firstName(),
    country: faker.location.country(),
    city: faker.location.city(),
    card: faker.finance.creditCardNumber(),
    month: (futureDate.getMonth() + 1).toString().padStart(2, '0'),
    year: futureDate.getFullYear().toString(),
  };
}
