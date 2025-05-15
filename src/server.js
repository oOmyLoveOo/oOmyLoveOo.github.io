const express = require('express');
const cors = require('cors'); // 👈 importar CORS
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // 👈 habilitar CORS para todas las rutas
app.use(express.json());

// Simulated light state
let lightState = 'off';

// Auth middleware (simple ejemplo)
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Encender luz
app.post('/api/services/light/turn_on', (req, res) => {
  const { entity_id } = req.body;
  if (!entity_id) {
    return res.status(400).json({ error: 'Missing entity_id' });
  }
  lightState = 'on';
  console.log(`Light ${entity_id} turned ON`);
  res.json({ success: true, state: lightState });
});

// Apagar luz
app.post('/api/services/light/turn_off', (req, res) => {
  const { entity_id } = req.body;
  if (!entity_id) {
    return res.status(400).json({ error: 'Missing entity_id' });
  }
  lightState = 'off';
  console.log(`Light ${entity_id} turned OFF`);
  res.json({ success: true, state: lightState });
});

// Consultar estado actual (opcional)
app.get('/api/light_state', (req, res) => {
  res.json({ state: lightState });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
