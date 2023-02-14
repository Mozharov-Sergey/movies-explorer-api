const express = require('express');
const { auth } = require('../middlewares/auth');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/movieValidation');

const movies = express.Router();
const { createMovie, getAllMovies, deleteMovie } = require('../controllers/movies');

movies.use(auth);
movies.get('/', getAllMovies);
movies.post('/', createMovieValidation(), createMovie);
movies.delete('/:movieId', deleteMovieValidation(), deleteMovie);

module.exports = { movies };
