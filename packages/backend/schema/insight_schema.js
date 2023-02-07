const mongoose = require('mongoose');

/*
The _id field is commented for dev purpose only.
We will be using our _id of the form {fromWallet}:{origin}
*/

const InsightSchema = mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    nonce: {
      type: String,
      required: true,
    },
    gasPrice: {
      type: String,
      required: true,
    },
    gas: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    chainId: {
      type: String,
      required: true,
    },
  },
  { collection: 'insightSchema' },
);

module.exports = mongoose.model('InsightSchema', InsightSchema);
