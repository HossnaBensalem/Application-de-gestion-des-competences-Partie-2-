const express = require('express');
const router = express.Router();
const {
  creerApprenant,
  listerApprenants,
  getApprenantById,
  modifierApprenant,
  supprimerApprenant
} = require('../controllers/apprenant.controller');

// POST /apprenants - créer un apprenant
router.post('/', creerApprenant);

// GET /apprenants - lister tous les apprenants
router.get('/', listerApprenants);

// GET /apprenants/:id - obtenir un apprenant par id
router.get('/:id', getApprenantById);

// PUT /apprenants/:id - modifier un apprenant
router.put('/:id', modifierApprenant);

// DELETE /apprenants/:id - supprimer un apprenant
router.delete('/:id', supprimerApprenant);

module.exports = router;
