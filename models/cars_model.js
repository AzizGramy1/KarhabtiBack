const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      
      required: true,
    },
    type_carrosserie: {
      type: String,
      required: true,
    },
    etat: { type: String, required: true },
    annee_production: { type: Number, required: true },
    annee_matriculation: { type: Number, required: true },
    cylindree: { type: Number, required: true },
    nbr_cylindre: {
      type: Number,
      required: true,
    },
    type_de_croix: { type: String },
    liste_entretiens: [{ type: String }],
    numero_chassis: { type: String, required: true, unique: true },
    architecture_moteur: {
      type: String,
    },
    transmission: {
      type: String,
      
      required: true,
    },
    pay_origine: { type: String }, 
    images: [{ type: String }],
  },
  { timestamps: true }
);

// Middleware pour déclencher après l'enregistrement d'une voiture
carsSchema.post("save", function (doc, next) {
  console.log(`La voiture ${doc.marque} ${doc.type_carrosserie} a été créée et enregistrée avec succès.`);
  next();
});

// Middleware pour effectuer des actions avant l'enregistrement d'une voiture
carsSchema.pre("save", function (next) {
  try {
    const car = this;
    // Vous pouvez ajouter ici des modifications ou des calculs automatiques avant d'enregistrer
    next();
  } catch (err) {
    next(err);
  }
});

const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
