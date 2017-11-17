module.exports = (app, express, ws) => {
  const api = express.Router();

  api.post('/payload', (req, res, next) => {
    const awss = ws.getWss();

    awss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(req.body));
      }
    });
    res.end();
  });
  app.use('/api', api);
}
