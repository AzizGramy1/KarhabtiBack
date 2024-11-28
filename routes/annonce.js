const express = require('express');
const router = express.Router();
const annoncesController = require('../controllers/annonceController'); 

// Créer une nouvelle annonce
router.post('addAnnonce/', annoncesController.createAnnonce);

// Récupérer toutes les annonces
router.get('getAllAnnonce/', annoncesController.getAnnonces);

// Récupérer une annonce par ID
router.get('getAnnonceById/:id', annoncesController.getAnnonceById);

// Mettre à jour une annonce par ID
router.put('updateAnnonceById/:id', annoncesController.updateAnnonce);

// Supprimer une annonce par ID
router.delete('deleteAnnonceById/:id', annoncesController.deleteAnnonce);

module.exports = router;
