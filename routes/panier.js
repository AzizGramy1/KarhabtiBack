const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');

// Create a new panier
router.post('/addNewPanier', panierController.createPanier);

// Get all paniers
router.get('/GetAllPanier', panierController.getPaniers);

// Get a single panier by ID
router.get('GetPanierByID/:id', panierController.getPanierById);

// Update a panier by ID
router.put('UpdatePanierByID/:id', panierController.updatePanier);

// Delete a panier by ID
router.delete('DeletePanierByID/:id', panierController.deletePanier);

// Add an annonce to a panier
router.post('AddAnnoceToPanier/:panierId/annonces/:annonceId', panierController.addAnnonceToPanier);

// Remove an annonce from a panier
router.delete('RemoveAnnoceToPanier/:panierId/annonces/:annonceId', panierController.removeAnnonceFromPanier);

module.exports = router;
