const User = require('../models/users_model'); // Importation du modèle User
const uploadImagesUsers = require('../middleWare/uploadFile'); // Importation de la configuration multer
const bcrypt = require('bcrypt');



// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rechercher des utilisateurs par critères
exports.searchUsers = async (req, res) => {
  try {
    let query = {};

    if (req.query.nom) {
      query.nom = new RegExp(req.query.nom, 'i'); // Recherche insensible à la casse
    }
    if (req.query.prenom) {
      query.prenom = new RegExp(req.query.prenom, 'i');
    }
    if (req.query.sexe) {
      query.sexe = req.query.sexe;
    }
    if (req.query.email) {
      query.email = new RegExp(req.query.email, 'i');
    }
    if (req.query.role) {
      query.role = req.query.role;
    }
    if (req.query.type_User) {
      query.type_User = req.query.type_User;
    }
    if (req.query.age_min || req.query.age_max) {
      query.age = {};
      if (req.query.age_min) {
        query.age.$gte = parseInt(req.query.age_min);
      }
      if (req.query.age_max) {
        query.age.$lte = parseInt(req.query.age_max);
      }
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trier les utilisateurs par plusieurs critères
exports.sortUsers = async (req, res) => {
  try {
    let sort = {};

    // Example: ?sortBy=age:desc,nom:asc
    if (req.query.sortBy) {
      const sortCriteria = req.query.sortBy.split(',');
      sortCriteria.forEach((criteria) => {
        const parts = criteria.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      });
    }

    const users = await User.find().sort(sort);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Créer un utilisateur avec une image
exports.createUserWithImage = [
  uploadImagesUsers.single('image_user'), // Middleware to handle image upload
  async (req, res) => {
    try {
      // Construct the user data from the request body and include the image path if it exists
      const userData = {
        ...req.body,
        image_user: req.file ? req.file.filename : undefined // Assign the filename if an image is uploaded
      };

      // Create and save the new user
      const newUser = new User(userData);
      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
];


//// Affectation des roles des utilisateur :



// Role Admin
exports.addUserAsAdmin = [
  uploadImagesUsers.single('image_user'), // Middleware pour gérer l'upload de l'image
  async (req, res) => {
    try {
      // Construct the user data from the request body and include the image path if it exists
      const userData = {
        ...req.body,
        image_user: req.file ? req.file.filename : undefined, // Assign the filename if an image is uploaded
        role: 'Admin' // Explicitly set the role to 'admin'
      };

      // Create and save the new user
      const newUser = new User(userData);
      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
];


//Role client
exports.addUserAsClient = [
  uploadImagesUsers.single('image_user'), // Middleware pour gérer l'upload de l'image
  async (req, res) => {
    try {
      // Construct the user data from the request body and include the image path if it exists
      const userData = {
        ...req.body,
        image_user: req.file ? req.file.filename : undefined, // Assign the filename if an image is uploaded
        role: 'client' // Explicitly set the role to 'client'
      };

      // Create and save the new user
      const newUser = new User(userData);
      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
];


//Update Mot de passe 



// Modifier le mot de passe d'un utilisateur
exports.changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Vérifier que le mot de passe ancien et nouveau sont fournis
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Ancien mot de passe et nouveau mot de passe sont requis.' });
    }

    // Trouver l'utilisateur par ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'ancien mot de passe est correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ancien mot de passe incorrect' });
    }

    // Valider le nouveau mot de passe (ajustez les critères selon vos besoins)
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Mettre à jour l'utilisateur avec le nouveau mot de passe
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe modifié avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


