const Panier = require('../models/panier_model'); // Import the Panier model
const Annonce = require('../models/annonce_model'); // Import the Annonce model

// Create a new panier
exports.createPanier = async (req, res) => {
  try {
    const newPanier = new Panier(req.body);
    await newPanier.save();
    res.status(201).json(newPanier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all paniers
exports.getPaniers = async (req, res) => {
  try {
    const paniers = await Panier.find().populate('user').populate('annonces');
    res.status(200).json(paniers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single panier by ID
exports.getPanierById = async (req, res) => {
  try {
    const panier = await Panier.findById(req.params.id).populate('user').populate('annonces');
    if (!panier) {
      return res.status(404).json({ message: 'Panier not found' });
    }
    res.status(200).json(panier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a panier by ID
exports.updatePanier = async (req, res) => {
  try {
    const updatedPanier = await Panier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user').populate('annonces');
    if (!updatedPanier) {
      return res.status(404).json({ message: 'Panier not found' });
    }
    res.status(200).json(updatedPanier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a panier by ID
exports.deletePanier = async (req, res) => {
  try {
    const deletedPanier = await Panier.findByIdAndDelete(req.params.id);
    if (!deletedPanier) {
      return res.status(404).json({ message: 'Panier not found' });
    }
    res.status(200).json({ message: 'Panier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add an annonce to a panier
exports.addAnnonceToPanier = async (req, res) => {
  try {
    const { panierId, annonceId } = req.params;

    // Find the panier by ID
    const panier = await Panier.findById(panierId);
    if (!panier) {
      return res.status(404).json({ message: 'Panier not found' });
    }

    // Find the annonce by ID
    const annonce = await Annonce.findById(annonceId);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce not found' });
    }

    // Add the annonce to the panier's annonces array
    panier.annonces.push(annonceId);
    
    // Update the total price of the panier
    panier.totalPrice += annonce.prix;

    // Save the updated panier
    await panier.save();

    // Also update the annonce's panier reference
    annonce.panier = panier._id;
    await annonce.save();

    res.status(200).json(panier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove an annonce from a panier
exports.removeAnnonceFromPanier = async (req, res) => {
  try {
    const { panierId, annonceId } = req.params;

    // Find the panier by ID
    const panier = await Panier.findById(panierId);
    if (!panier) {
      return res.status(404).json({ message: 'Panier not found' });
    }

    // Check if the annonce is in the panier
    const annonceIndex = panier.annonces.indexOf(annonceId);
    if (annonceIndex === -1) {
      return res.status(404).json({ message: 'Annonce not found in panier' });
    }

    // Remove the annonce from the panier's annonces array
    panier.annonces.splice(annonceIndex, 1);
    
    // Update the total price of the panier
    const annonce = await Annonce.findById(annonceId);
    panier.totalPrice -= annonce.prix;

    // Save the updated panier
    await panier.save();

    // Also remove the panier reference from the annonce
    annonce.panier = null;
    await annonce.save();

    res.status(200).json(panier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
