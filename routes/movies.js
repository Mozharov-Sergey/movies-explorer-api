const express = require('express');
const { auth } = require('../middlewares/auth');

const movies = express.Router();
const { createMovie, getAllMovies, deleteMovie } = require('../controllers/movies');

movies.use(auth);
movies.get('/', getAllMovies);
movies.post('/', createMovie);
movies.delete('/:movieId', deleteMovie);

module.exports = { movies };
