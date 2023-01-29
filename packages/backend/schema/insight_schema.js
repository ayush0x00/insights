const mongoose = require('mongoose');

/*
The _id field is commented for dev purpose only.
We will be using our _id of the form {fromWallet}:{origin}
*/

const InsightSchema = mongoose.Schema(
  {
    //   _id: {
    //     type: String,
    //     required: true,
    //   },
    origin: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  { collection: 'insightSchema' },
);

module.exports = mongoose.model('InsightSchema', InsightSchema);
