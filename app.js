const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 4800;

// Configurar Multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // La carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `${Date.now()}${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Endpoint para mostrar un formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Endpoint para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Archivo subido con éxito');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});