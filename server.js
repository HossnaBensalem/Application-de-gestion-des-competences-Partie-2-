require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 🔸 Middlewares
app.use(cors());
app.use(express.json());

// 🔸 Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion à MongoDB réussie'))
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
  process.exit(1);
});

// 🔸 Import des routes
const renduRoutes = require('./routes/rendu.routes');
const apprenantRoutes = require('./routes/apprenant.routes');

// 🔸 Utilisation des routes
app.use('/rendus', renduRoutes);
app.use('/apprenants', apprenantRoutes);

// 🔸 Route d’accueil
app.get('/', (req, res) => {
  res.send('Bienvenue dans le service Apprenant 👨‍🎓');
});

// 🔸 Lancement du serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Apprenant-Service lancé sur le port ${PORT}`);
});
