const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { Decimal128 } = require('bson');

// URL of your API endpoint
const apiUser = 'http://localhost:3000/users';
const apiProperty = 'http://localhost:3000/properties';

// Function to create a user using the API
const createFakeUser = async () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.location.streetAddress(),
    contactInfo: faker.phone.number(),
  };

  try {
    const response = await axios.post(apiUser, user);
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
};

const createAdmin = async () => {
  const admin = {
    username: "Admin",
    email: "Admin@example.com",
    password: "admin123",
  };
  try {
    const response = await axios.post(apiUser, admin);
    console.log('User created:', response.data);
    return response.data._id;
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
}

const types = ['House', 'Apartment', 'Condominium', 'Villa', 'Other'];
const ACCEPTED_CURRENCIES = ['USD', 'EUR', 'COL'];
const suffix = ['Avenue', 'Street', 'Road'];
const createFakeProperty = async (adminid) => {
    const property = {
      title: faker.location.city(),
      owner: adminid,
      availability: true,
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(types),
      price: {
        amount: new Decimal128(faker.commerce.price()),
        currency: faker.helpers.arrayElement(ACCEPTED_CURRENCIES),
      },
      address: {
        street_type_1: faker.helpers.arrayElement(suffix),
        street_name_1: faker.location.street(),
        street_type_2: faker.helpers.arrayElement(suffix),
        street_name_2: faker.location.street(),
        unit_number: faker.location.secondaryAddress(),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state(),
        postal_code: faker.location.zipCode(),
        country: faker.location.country(),
        fullAddress: faker.location.streetAddress(),
      },
      size: faker.number.int({ min: 20, max: 1000 }),
      bedrooms: faker.number.int({ min: 1, max: 10 }),
      bathrooms: faker.number.int({ min: 1, max: 5 })
    };
  
    try {
      const response = await axios.post(apiProperty, property);
      console.log('Property created:', response.data);
    } catch (error) {
      console.error('Error creating property:', error.response ? error.response.data : error.message);
    }
  };

// Function to create multiple users
const seed = async (numUsers) => {
  const admin_id = await createAdmin();
  for (let i = 0; i < numUsers; i++) {
    await createFakeUser();
    await createFakeProperty(admin_id);
  }
};

// Number of users to create
const numUsers = 25;
seed(numUsers);

