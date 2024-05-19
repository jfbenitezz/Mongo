const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    altText: { type: String },
  }, {timestamps: true});

  module.exports = imageSchema;