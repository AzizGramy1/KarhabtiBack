const AssistanceSupport = require('../models/assistance&support_model');

// Créer une nouvelle assistance/support
exports.createAssistanceSupport = async (req, res) => {
  try {
    const newSupport = new AssistanceSupport(req.body);
    await newSupport.save();
    res.status(201).json(newSupport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les assistances/supports
exports.getAllAssistanceSupport = async (req, res) => {
  try {
    const supports = await AssistanceSupport.find();
    res.status(200).json(supports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une assistance/support par ID
exports.getAssistanceSupportById = async (req, res) => {
  try {
    const support = await AssistanceSupport.findById(req.params.id);
    if (!support) {
      return res.status(404).json({ message: 'Support non trouvé' });
    }
    res.status(200).json(support);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une assistance/support
exports.updateAssistanceSupport = async (req, res) => {
  try {
    const updatedSupport = await AssistanceSupport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSupport) {
      return res.status(404).json({ message: 'Support non trouvé' });
    }
    res.status(200).json(updatedSupport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une assistance/support
exports.deleteAssistanceSupport = async (req, res) => {
  try {
    const deletedSupport = await AssistanceSupport.findByIdAndDelete(req.params.id);
    if (!deletedSupport) {
      return res.status(404).json({ message: 'Support non trouvé' });
    }
    res.status(200).json({ message: 'Support supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
