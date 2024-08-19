const Commentaire = require('../models/commentaire_model');

// Créer un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const newCommentaire = new Commentaire(req.body);
    await newCommentaire.save();
    res.status(201).json(newCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les commentaires
exports.getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find().populate('id_user_commentaire');
    res.status(200).json(commentaires);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un commentaire par ID
exports.getCommentaireById = async (req, res) => {
  try {
    const commentaire = await Commentaire.findById(req.params.id).populate('id_user_commentaire');
    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.status(200).json(commentaire);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un commentaire
exports.updateCommentaire = async (req, res) => {
  try {
    const updatedCommentaire = await Commentaire.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCommentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.status(200).json(updatedCommentaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const deletedCommentaire = await Commentaire.findByIdAndDelete(req.params.id);
    if (!deletedCommentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }
    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
