// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated light state
let lightState = 'off';

// Auth middleware (simple example)
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Turn ON light
app.post('/api/services/light/turn_on', (req, res) => {
  const { entity_id } = req.body;
  if (!entity_id) {
    return res.status(400).json({ error: 'Missing entity_id' });
  }
  lightState = 'on';
  console.log(`Light ${entity_id} turned ON`);
  res.json({ success: true, state: lightState });
});

// Turn OFF light
app.post('/api/services/light/turn_off', (req, res) => {
  const { entity_id } = req.body;
  if (!entity_id) {
    return res.status(400).json({ error: 'Missing entity_id' });
  }
  lightState = 'off';
  console.log(`Light ${entity_id} turned OFF`);
  res.json({ success: true, state: lightState });
});

// Optional endpoint to get current state
app.get('/api/light_state', (req, res) => {
  res.json({ state: lightState });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
