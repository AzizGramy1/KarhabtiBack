const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

// Routes pour les commentaires
router.post('addCommentaire/', commentaireController.createCommentaire);
router.get('getAllCommentaire/', commentaireController.getAllCommentaires);
router.get('getCommentaireById/:id', commentaireController.getCommentaireById);
router.put('updateCommentaireById/:id', commentaireController.updateCommentaire);
router.delete('deleteCommentaireById/:id', commentaireController.deleteCommentaire);

module.exports = router;
