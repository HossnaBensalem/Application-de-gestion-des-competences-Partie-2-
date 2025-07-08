const mongoose = require('mongoose');

const apprenantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Apprenant', apprenantSchema);
