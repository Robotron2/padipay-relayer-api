const express = require('express');
const request = require('supertest');
const relayerRoutes = require('../../src/routes/relayer.routes');
const errorHandler = require('../../src/middleware/error.middleware');

describe('Relayer Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/relayer', relayerRoutes);
    app.use(errorHandler);
  });

  describe('POST /api/relayer/submit-escrow', () => {
    it('should fail validation when payload is missing', async () => {
      const res = await request(app).post('/api/relayer/submit-escrow').send({});
      
      expect(res.status).toBe(400); // Validation error
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });

    it('should pass validation and hit scaffolded route', async () => {
      const payload = { actionType: 'LOCK' };
      
      const res = await request(app)
        .post('/api/relayer/submit-escrow')
        .send(payload);
        
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('submit-escrow route scaffolded');
    });
  });

  describe('GET /api/relayer/status/:txId', () => {
    it('should hit scaffolded route and return txId', async () => {
      const res = await request(app).get('/api/relayer/status/12345');
      
      expect(res.status).toBe(200);
      expect(res.body.txId).toBe('12345');
      expect(res.body.message).toBe('status route scaffolded');
    });
  });
});
