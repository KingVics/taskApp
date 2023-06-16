require('dotenv').config();
const connectDb = require('./db/connect');
const express = require('express');
const { env } = require('process');
const task = require('./route/task');
const nofound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 5000;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', task);

app.use(nofound);
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDb(env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
