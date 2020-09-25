const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Post = require('../schema/postSchema');
const User = require('../schema/userSchema');

const { expect } = chai;

chai.use(chaiHttp);

// Tests for posts route
describe('Posts', () => {
  let token;

  before(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    const user = new User({
      email: 'jmnorthover@gmail.com',
      username: 'testuser',
      password: 'testpw',
    });

    await user.save();

    token = user.generateAuthToken();
  });

  it('should get existing posts, none currently exist', async () => {
    const res = await chai.request(app).get('/api/posts');

    expect(res).to.have.status(200);
    expect(res.body.posts).to.have.lengthOf(0);
  });

  it('should fail to add post due to lack of valid token', async () => {
    const res = await chai
      .request(app)
      .post('/api/posts')
      .set('Content-Type', 'application/json')
      .send({ postContent: 'first post' });

    expect(res).to.have.status(401);
    expect(res.body.error).to.contain('Not authorized to perform this action');
  });

  it('should successfully add first post', async () => {
    const res = await chai
      .request(app)
      .post('/api/posts')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ postContent: 'first post' });

    expect(res).to.have.status(200);
    expect(res.body.content).to.equal('first post');
  });

  it('should get existing posts, one currently exists', async () => {
    const res = await chai.request(app).get('/api/posts');

    expect(res).to.have.status(200);
    expect(res.body.posts).to.have.lengthOf(1);
    expect(res.body.posts[0].content).to.equal('first post');
  });

  it('should successfully add second post', async () => {
    const res = await chai
      .request(app)
      .post('/api/posts')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ postContent: 'second post' });

    expect(res).to.have.status(200);
    expect(res.body.content).to.contain('second');
  });

  it('should get existing posts, two currently exist', async () => {
    const res = await chai.request(app).get('/api/posts');

    expect(res).to.have.status(200);
    expect(res.body.posts).to.have.lengthOf(2);
    expect(res.body.posts[0].content).to.equal('second post');
    expect(res.body.posts[1].content).to.equal('first post');
  });
});
