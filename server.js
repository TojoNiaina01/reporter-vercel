// server.js
const express = require('express');
const next = require('next');
const cors = require('cors');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.port || 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const corsOptions = {
  origin: 'http://localhost:3000', // Remplacez par l'origine autorisée pour vos requêtes Knex.js
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Si vous utilisez des cookies ou des en-têtes d'autorisation
};


app.prepare().then(() => {
  const server = express();
  const imagesDir = path.join(__dirname, 'uploads','images');
  const videoDir = path.join(__dirname, 'uploads','videos');
  
  server.use('/images', express.static(imagesDir));
  server.use('/videos', express.static(videoDir));

  // Utiliser le middleware CORS pour activer les en-têtes CORS
  server.use(cors(corsOptions));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});