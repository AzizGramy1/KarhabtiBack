const Annonce = require('../models/annonce_model'); // Assurez-vous que le chemin est correct

// Créer une annonce
exports.createAnnonce = async (req, res) => {
  try {
    const newAnnonce = new Annonce(req.body);
    await newAnnonce.save();
    res.status(201).json(newAnnonce);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les annonces
exports.getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.status(200).json(annonces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une annonce par ID
exports.getAnnonceById = async (req, res) => {
  try {
    const annonce = await Annonce.findById(req.params.id);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.status(200).json(annonce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une annonce par ID
exports.updateAnnonce = async (req, res) => {
  try {
    const updatedAnnonce = await Annonce.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAnnonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.status(200).json(updatedAnnonce);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une annonce par ID
exports.deleteAnnonce = async (req, res) => {
  try {
    const deletedAnnonce = await Annonce.findByIdAndDelete(req.params.id);
    if (!deletedAnnonce) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.status(200).json({ message: 'Annonce supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
