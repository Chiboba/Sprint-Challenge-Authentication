const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig')
const secret = require('../_secrets/keys')

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken() {

}

function register(req, res) {
  const {username, password} = req.body;
  bcrypt.hash(password, 8)
  .then(password => 
    db('users').insert({username, password}))
  .then((id) => {
    res.status(201).json(id)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

function login(req, res) {
  const user = req.body;
  db('users')
  .where('username', '=', user.username)
  .first()
  .then(stored => {
    if(user && bcrypt.compareSync(user.password, stored.password)) {
      console.log(secret)
      const token = jwt.sign({username: stored.username}, secret.jwtKey, { expiresIn: '24h' });
      res.status(200).json(token);
    } else {
      res.status(406).json({message:'Authentication Error'})
    }
  })
  .catch(err => {
    res.status(500).json(err);
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://safe-falls-22549.herokuapp.com/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
