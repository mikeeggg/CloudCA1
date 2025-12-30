const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// POST /submit
app.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  // For now just log (Firestore comes later)
  console.log('Received submission:', { email, password });

  res.status(200).send('Submission received');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
