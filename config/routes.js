const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');
const secret = process.env.JWT_SECRET;

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const generateToken = user => {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
};

function register(req, res) {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db('users')
    .insert(user)
    .then(id => {
      console.log(id);
      db('users')
        .where({ username: user.username })
        .first()
        .then(user => {
          console.log(user);
          const token = generateToken(user);
          res.status(201).json({ id: user.id, token });
        });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

function login(req, res) {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        console.log(user);
        const token = generateToken(user);
        res.json({ id: user.id, token });
      } else {
        res.status(404).json({
          error: 'Invalid credentials were entered. Please try again.'
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
