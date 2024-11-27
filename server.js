const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); // Servir les fichiers

// Configuration de Multer
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Endpoint pour recevoir les images
app.post('/upload', upload.single('image'), (req, res) => {
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

