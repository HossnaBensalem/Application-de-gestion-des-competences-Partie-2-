require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connexion à MongoDB réussie'))
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
  process.exit(1);
});

// استيراد الراوترات
const renduRoutes = require('./routes/rendu.routes');
const apprenantRoutes = require('./routes/apprenant.routes');

app.use('/rendus', renduRoutes);
app.use('/apprenants', apprenantRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue dans le service Apprenant 👨‍🎓');
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Apprenant-Service lancé sur le port ${PORT}`);
});

// لتصدير app و server للاختبارات
module.exports = { app, server };
