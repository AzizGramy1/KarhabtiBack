const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panierSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  annonces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Annonce',
      required: true,    /// assocation o many to many avec le model annonces
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
});

panierSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Panier = mongoose.model('Panier', panierSchema);

module.exports = Panier;