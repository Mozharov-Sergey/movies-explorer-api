const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const Movie = require('../models/movie');

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const allMovies = await Movie.find({});

    if (!allMovies) {
      throw new NotFoundError('Ошибка поиска фильмоф');
    }
    return res.send(allMovies);
  } catch (err) {
    return next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });

    return res.send({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Фильма с таким ID нет в списке');
    }

    await Movie.findByIdAndRemove(movieId);

    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};
