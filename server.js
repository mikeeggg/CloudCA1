const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Firestore init (3 supported ways):
 * 1) Cloud Run (recommended): uses the Cloud Run service account automatically (Application Default Credentials)
 * 2) Local dev: run `gcloud auth application-default login`
 * 3) Local dev alt: set GOOGLE_APPLICATION_CREDENTIALS to a service account key JSON path
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

const db = admin.firestore();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// POST /submit -> writes to Firestore
app.post('/submit', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }

    // Don’t store raw passwords (even for a CA, it’s bad practice)
    const passwordHash = crypto.createHash('sha256').update(String(password)).digest('hex');

    const doc = {
      email: String(email).trim().toLowerCase(),
      passwordHash,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userAgent: req.get('user-agent') || null
    };

    await db.collection('submissions').add(doc);

    return res.status(200).send('Submission stored in Firestore');
  } catch (err) {
    console.error('Firestore write failed:', err);
    return res.status(500).send('Server error writing to Firestore');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
