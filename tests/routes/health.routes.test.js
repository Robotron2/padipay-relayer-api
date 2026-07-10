const express = require('express');
const request = require('supertest');
const healthRoutes = require('../../src/routes/health.routes');

describe('Health Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use('/health', healthRoutes);
  });

  it('GET /health should return 200 OK', async () => {
    const res = await request(app).get('/health');
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      service: 'padipay-relayer-api',
      version: '0.1.0',
      timestamp: expect.any(String),
    });
  });
});
