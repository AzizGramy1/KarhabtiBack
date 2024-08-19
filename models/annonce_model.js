const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema(
  {
    id_annonce: { type: Number, required: true, unique: true },
    date_publication: { type: Date, required: true, default: Date.now },
    type_annonce: { type: String, required: true },
    editeur: { type: String, required: true },
    etat: { type: String, required: true },
    prix: { type: Number, required: true },

    // url des image de la publication (maximum 10 images)
    url_image1: { type: String,required: true }, 
    url_image2: { type: String }, 
    url_image3: { type: String },
    url_image4: { type: String }, 
    url_image5: { type: String }, 
    url_image6: { type: String }, 
    url_image7: { type: String }, 
    url_image8: { type: String }, 
    url_image9: { type: String }, 
    url_image10: { type: String },  

    description: { type: String, maxlength: 15000 } // description de l'annonce / voiture à vendre
  },
  { timestamps: true }
);

const Annonce = mongoose.model('Annonce', annonceSchema);
module.exports = Annonce;
