import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Simple API endpoint
export const api = functions.https.onRequest(async (request, response) => {
  // Set CORS headers
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }

  // Health check
  if (request.path === '/health') {
    response.json({ status: 'ok', timestamp: Date.now() });
    return;
  }

  // For now, return a simple response
  // We'll integrate the full tRPC server later
  response.json({
    message: 'Silver Market Dashboard API',
    path: request.path,
    method: request.method
  });
});
