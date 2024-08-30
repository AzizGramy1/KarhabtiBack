const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema(
  {
    id_annonce: { type: Number, required: true, unique: true },
    date_publication: { type: Date, required: true, default: Date.now },
    type_annonce: { type: String, required: true },
    editeur: { type: String, required: true },
    etat: { type: String, required: true },
    prix: { type: Number, required: true },

    // URLs of the images (maximum 10 images)
    url_image1: { type: String, required: true },
    url_image2: { type: String },
    url_image3: { type: String },
    url_image4: { type: String },
    url_image5: { type: String },
    url_image6: { type: String },
    url_image7: { type: String },
    url_image8: { type: String },
    url_image9: { type: String },
    url_image10: { type: String },

    description: { type: String, maxlength: 15000 },

    // Reference to the user who created the annonce
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Reference to the cars associated with this annonce
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cars' }] // One-to-many relationship with Cars
  },
  { timestamps: true }
);

const Annonce = mongoose.model('Annonce', annonceSchema);
module.exports = Annonce;
