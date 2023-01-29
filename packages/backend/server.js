const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const InsightSchema = require('./schema/insight_schema');

/*
Please update DB_CONN url in the config directory with
the URI your mongodb is listening on
*/

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello world');
});

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('DB_CONN'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const sampleData = new InsightSchema({
      origin: "Ayush's Mac m1",
      from: 'Ayush tiwari',
      to: 'Travelling team',
    });

    sampleData.save((err, res) => {
      if (err) {
        console.log('Oops something went wrong');
        throw new Error(err);
      } else if (!err) {
        console.log('Yayy..data saved ', res._id);
      }
    });
    console.log('DB connected');
  } catch (e) {
    console.log(e);
    throw new Error('Unable to connect to database');
  }
};

connectDB();

app.listen(1234, () => console.log('Backend is listening on port 3000.'));
