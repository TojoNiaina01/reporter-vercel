// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const cors = require('cors')

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
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const corsHandler = cors(corsOptions);
    corsHandler(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})