const express = require("express");
const router = require('./routes');
const {connectDB} = require('./db')

/*
Please update DB_CONN url in the config directory with
the URI your mongodb is listening on
*/

const app = express();
var cors = require('cors');
app.use(cors())
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world");
});

connectDB();

app.use('/', router)

app.listen(process.env.PORT || 3000, () => console.log(`Backend is listening on port ${process.env.PORT || 3000}`));
