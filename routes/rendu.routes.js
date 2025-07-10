const express = require('express');
const router = express.Router();
const {
  creerRendu,
  listerRendus,
  rendusParApprenant,
  getCompetencesDuBrief
} = require('../controllers/rendu.controller');

// 🔹 POST /rendus → créer un rendu
router.post('/', creerRendu);

// 🔹 GET /rendus → lister tous les rendus
router.get('/', listerRendus);

// 🔹 GET /rendus/apprenant/:apprenantId → rendus par apprenant
router.get('/apprenant/:apprenantId', rendusParApprenant);

// 🔹 GET /rendus/:id/competences → compétences attendues d’un rendu
router.get('/:id/competences', getCompetencesDuBrief);

module.exports = router;
