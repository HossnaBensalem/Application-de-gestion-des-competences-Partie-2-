const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');  // تأكد أن server.js يُصدر app

const Rendu = require('../models/Rendu');
const Apprenant = require('../models/Apprenant');

describe('Rendu API', () => {
  let server;
  let apprenantId;

  beforeAll(async () => {
    // ربط مع MongoDB اختبارية
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    server = app.listen(4000);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(async () => {
    // تنظيف الداتا قبل كل اختبار
    await Rendu.deleteMany();
    await Apprenant.deleteMany();

    // إنشاء Apprenant تجريبي
    const apprenant = await Apprenant.create({ nom: 'Test User', email: 'testuser@example.com' });
    apprenantId = apprenant._id;
  });

  test('POST /rendus - créer un rendu', async () => {
    const response = await request(server)
      .post('/rendus')
      .send({
        briefId: new mongoose.Types.ObjectId(),
        apprenantId,
        lien: 'https://github.com/test/rendu1'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.lien).toBe('https://github.com/test/rendu1');
  });

  test('GET /rendus - récupérer la liste des rendus', async () => {
    await Rendu.create({
      briefId: new mongoose.Types.ObjectId(),
      apprenantId,
      lien: 'https://github.com/test/rendu2'
    });

    const response = await request(server).get('/rendus');

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  // يمكن إضافة اختبارات أخرى مثل GET /rendus/:id/competences وهكذا
});
