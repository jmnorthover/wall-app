const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const morgan = require('morgan');
const cors = require('cors');
const { MONGO_URI, PORT } = require('./config/keys');

mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.json());

app.use(morgan('tiny'));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use(express.static('build'));

app.listen(PORT, () => {
  console.log('Application started');
});

module.exports = app;
