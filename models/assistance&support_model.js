const mongoose = require('mongoose');

const assistanceSupportSchema = new mongoose.Schema({
  id_support: {
    type: Number,
    required: true,
    unique: true
  },
  type_support: {
    type: String,
    required: true
  },
  date_support: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const AssistanceSupport = mongoose.model('AssistanceSupport', assistanceSupportSchema);

module.exports = AssistanceSupport;
