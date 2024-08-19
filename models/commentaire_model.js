const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  id_commentaire: {
    type: Number,
    required: true,
    unique: true
  },
  contenue: {
    type: String,
    required: true
  },
  id_user_commentaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Commentaire = mongoose.model('Commentaire', commentaireSchema);

module.exports = Commentaire;
