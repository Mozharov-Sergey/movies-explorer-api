const devDataBase = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const errorMessages = {
  filmNotFound: 'Фильма с таким ID нет в списке',
  removeVicariousFilm: 'Вы не можете удалить фильмы другого пользователя',
  userDuplication: 'Пользователь с таким Email уже существует',
  userNotExist: 'Такого пользователя не существует',
  loginError: 'Не верный пользователь или пароль',
  authRequired: 'Необходима авторизация',
  invalidToken: 'Невалидный токен',
  error500Message: 'Ошибка на сервере',
  incorrectURL: 'Не корректный URL',
  incorrectEmail: 'Не корректный email',
  incorrectImageUrl: 'Поле Image не является url адресом',
  incorrectTrailerUrl: 'Поле trailerLink не является url адресом',
  incorrectThumbnail: 'Поле thumbnail не является url адресом',
};

module.exports = { devDataBase, errorMessages };
