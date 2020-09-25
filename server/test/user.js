const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../schema/userSchema');

const { expect } = chai;

chai.use(chaiHttp);

// Tests for user route
describe('Users', () => {
  before(async () => {
    await User.deleteMany({});
  });

  // Tests for attempting to register a user
  describe('/POST register', () => {
    it('should successfully register a new user', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send({
          email: 'jmnorthover@gmail.com',
          username: 'testuser',
          password: 'testpw',
        });

      expect(res).to.have.status(201);
      expect(res.body.token).to.contain('Bearer');
    });

    it('should fail to register user due to email being in use', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send({
          email: 'jmnorthover@gmail.com',
          username: 'testacc',
          password: 'testpw',
        });

      expect(res).to.have.status(400);
      expect(res.body.error).to.contain('Username or e-mail already in use');
    });

    it('should fail to register user due to email being invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/register')
        .set('Content-Type', 'application/json')
        .send({
          email: 'jmnorthovergmail.com',
          username: 'testacc',
          password: 'testpw',
        });

      expect(res).to.have.status(400);
      expect(res.body.error).to.contain('mail is not valid');
    });
  });

  // Tests for attempting to log in a user
  describe('/POST login', () => {
    it('should successfully log in an existing user', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'testuser',
          password: 'testpw',
        });

      expect(res).to.have.status(200);
      expect(res.body.token).to.contain('Bearer');
    });

    it('should fail to log in because user does not exist', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'nonexistantuser',
          password: 'testpw',
        });

      expect(res).to.have.status(400);
      expect(res.body.error).to.contain('User not found');
    });

    it('should fail to log in because password is incorrect', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          username: 'testuser',
          password: 'wrongpass',
        });

      expect(res).to.have.status(400);
      expect(res.body.error).to.contain('Incorrect password');
    });
  });
});
