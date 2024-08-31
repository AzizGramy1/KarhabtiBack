const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController'); 

// Créer une nouvelle voiture
router.post('/addCar/', carsController.createCar);

//Ajouter des photos à une annonce deja existantes

    

// Récupérer toutes les voitures
router.get('/getAllCar', carsController.getCars);

// Récupérer une voiture par ID
router.get('/getCarById/:id', carsController.getCarById);

// Mettre à jour une voiture par ID
router.put('/updateCarById/:id', carsController.updateCar);

// Supprimer une voiture par ID
router.delete('/deleteCarById/:id', carsController.deleteCar);

router.get('/searchCar',carsController.searchCars);

//trier les vehicules par different criteres
router.get('/searchCarMultiCritere',carsController.sortCarsByCriteria);


//Recuperer la liste paginée des voitures 
router.get('/getCarPagineted',carsController.getPaginatedCars);




module.exports = router;
