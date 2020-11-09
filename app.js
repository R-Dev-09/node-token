const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const router = express.Router();

router.get('/api/token/:token', (req, res, next) => {
  try {
    const encodedToken = req.params.token;
    if (!encodedToken) res.status(400).json({message: 'No token was sent with request'});
    else {
      const decodedToken = jwt.decode(encodedToken, {json: true});
      res.status(200).json({decodedToken});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, User-Email');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      return res.status(200).json({});
  };
  next();
});

app.use('/', router);

app.use((req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
      error: {
          message: error.message
      }
  });
});

module.exports = app;