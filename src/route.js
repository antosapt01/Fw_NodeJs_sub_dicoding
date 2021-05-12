const {
  addBookHandler,
  getAllBooksHandler,
  getSpecificBooksHandler,
  updateBooksByIdHandler,
  deletingIdHadler,
} = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    // options: {
    //   cors: {
    //     origin: ['*'],
    //   },
    // },
  },
  {
    method: 'GET',
    // path: '/hello/{id?}',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getSpecificBooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deletingIdHadler,
  },
];

module.exports = route;
