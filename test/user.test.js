const request = require('supertest')
const app = require('../src/server')
const mongoose = require('mongoose')
const User = require('../src/models/User')

beforeEach(async () => {
  await User.deleteMany();
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('User Registration and Login', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: "john@example.com",
        password: 'password123'
      })
      .expect(201)

    // Verify user was created in the database
    const user = await User.findOne({ email: 'john@example.com' });
    expect(user).not.toBeNull();

    // Verify response contains user details (excluding password)
    expect(response.body).toMatchObject({
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    })
  });

  it('should login an existing user', async () => {
    // register a user
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: "john@example.com",
        password: 'password123'
      })

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: "john@example.com",
        password: 'password123'
      })
      .expect(200)

    // verify response contains authentication token
    expect(response.body).toHaveProperty('token');
  })
})

