const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage ? !!+1 : !!+0;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  if (readPage <= pageCount) {
    if (name !== undefined) {
      books.push(newBooks);
      const isSuccess = books.filter((book) => book.id === id).length > 0;
      if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        // response.header('Content-Type', 'application/json; charset=utf-8');
        // response.header('Access-Control-Allow-Origin', '*');
        response.code(201);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const index = books.filter((book) => book).length > 0;
  const data = [];
  const dataread = [];
  const datafinish = [];
  const dataname = [];
  if (index) {
    if (name === undefined && reading === undefined && finished === undefined) {
      for (const i in books) {
        data.push({ id: books[i].id, name: books[i].name, publisher: books[i].publisher });
      }
      const response = h.response({
        status: 'success',
        data: {
          books: data,
        },
      });
      response.code(200);
      return response;
    }
    if (reading !== undefined) {
      for (const i in books) {
        if (books[i].reading === Boolean(Number(reading))) {
          dataread.push({ id: books[i].id, name: books[i].name, publisher: books[i].publisher });
        }
      }
      const response = h.response({
        status: 'success',
        data: {
          books: dataread,
        },
      });
      response.code(200);
      return response;
    }
    if (finished !== undefined) {
      for (const i in books) {
        if (books[i].finished === Boolean(Number(finished))) {
          datafinish.push({ id: books[i].id, name: books[i].name, publisher: books[i].publisher });
        }
      }
      const response = h.response({
        status: 'success',
        data: {
          books: datafinish,
        },
      });
      response.code(200);
      return response;
    }
    if (name !== undefined) {
      for (const i in books) {
        if (books[i].name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
          dataname.push({ id: books[i].id, name: books[i].name, publisher: books[i].publisher });
        }
      }
      const response = h.response({
        status: 'success',
        data: {
          books: dataname,
        },
      });
      response.code(200);
      return response;
    }
    // const response = h.response({
    //   status: 'success',
    //   data: {
    //     books: data,
    //   },
    // });
    // response.code(200);
    // return response;
  }
  const response = h.response({
    status: 'success',
    message: 'data kosong',
  });
  response.code(404);
  return response;
};

const getSpecificBooksHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage ? !!+1 : !!+0;

  if (readPage <= pageCount) {
    if (name !== undefined) {
      const index = books.findIndex((book) => book.id === bookId);
      if (index !== -1) {
        books[index] = {
          ...books[index],
          name,
          year,
          author,
          summary,
          publisher,
          pageCount,
          readPage,
          finished,
          reading,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
};

const deletingIdHadler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getSpecificBooksHandler,
  updateBooksByIdHandler,
  deletingIdHadler,
};
