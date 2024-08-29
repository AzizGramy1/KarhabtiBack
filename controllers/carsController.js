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


//Recherche de voiture avec plusieurs criteres 
exports.searchCars = async (req, res) => {
  try {
    let query = {};

    if (req.query.marque) {
      query.marque = req.query.marque;
    }
    if (req.query.type_carrosserie) {
      query.type_carrosserie = req.query.type_carrosserie;
    }
    if (req.query.etat) {
      query.etat = req.query.etat;
    }
    if (req.query.annee_production) {
      query.annee_production = req.query.annee_production;
    }
    if (req.query.transmission) {
      query.transmission = req.query.transmission;
    }
    // Ajoutez d'autres critères de recherche si nécessaire

    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Recherche et tri des voitures
exports.searchAndSortCars = async (req, res) => {
  try {
    let query = {};

    // Recherche par critères
    if (req.query.marque) {
      query.marque = req.query.marque;
    }
    if (req.query.type_carrosserie) {
      query.type_carrosserie = req.query.type_carrosserie;
    }
    if (req.query.etat) {
      query.etat = req.query.etat;
    }
    if (req.query.annee_production) {
      query.annee_production = req.query.annee_production;
    }
    if (req.query.transmission) {
      query.transmission = req.query.transmission;
    }
    // Ajoutez d'autres critères de recherche si nécessaire

    // Tri par critères
    let sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const cars = await Car.find(query).sort(sort);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Trier les voitures
exports.sortCars = async (req, res) => {
  try {
    // Tri par critères
    let sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const cars = await Car.find().sort(sort);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Trier les voitures par plusieurs critères
exports.sortCarsByCriteria = async (req, res) => {
  try {
    let sort = {};

    // Vérifiez si des critères de tri sont fournis
    if (req.query.sortBy) {
      const criteria = req.query.sortBy.split(',');

      criteria.forEach((criterion) => {
        const [key, order] = criterion.split(':');
        sort[key] = order === 'desc' ? -1 : 1;
      });
    }

    const cars = await Car.find().sort(sort);
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les voitures avec pagination
exports.getPaginatedCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const cars = await Car.find().skip(skip).limit(limit);
    const total = await Car.countDocuments();

    res.status(200).json({
      cars,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

