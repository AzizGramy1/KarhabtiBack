var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');  

// Route pour créer un utilisateur
router.post('addUser/', userController.createUser);

// Route pour obtenir la liste des utilisateurs
router.get('getAllUser/', userController.getUsers);

// Route pour obtenir un utilisateur par ID
router.get('getUserById/:id', userController.getUserById);

// Route pour mettre à jour un utilisateur
router.put('updateUserById/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('DeleteUserById/:id', userController.deleteUser);

module.exports = router;
