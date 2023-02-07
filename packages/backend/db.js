const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
    try {
      const mongoURL = process.env.MONGO_URL || config.get("DB_CONN");
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connected");
    } catch (e) {
      console.log(e);
    }
  };

module.exports = {
    connectDB
}