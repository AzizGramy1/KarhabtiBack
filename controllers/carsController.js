const Car = require('../models/cars_model'); // Importation du modèle Car

// Créer une voiture
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les voitures
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une voiture par ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une voiture
exports.updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une voiture
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }
    res.status(200).json({ message: 'Voiture supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};