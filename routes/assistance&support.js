const express = require('express');
const router = express.Router();
const assistanceSupportController = require('../controllers/assistance&supportController');


//ajouter unne assistance
router.post('addAssistance&support/', assistanceSupportController.createAssistanceSupport);

//afficher les assistances
router.get('getAllAssistance&support/', assistanceSupportController.getAllAssistanceSupport);

// afficher assistance by ID
router.get('getAssistance&supportById/:id', assistanceSupportController.getAssistanceSupportById);

//modifier les assistance by ID
router.put('updateAssistance&supportById/:id', assistanceSupportController.updateAssistanceSupport);

// supprimer une assistance by ID
router.delete('deleteAssistance&supportById/:id', assistanceSupportController.deleteAssistanceSupport);

module.exports = router;
