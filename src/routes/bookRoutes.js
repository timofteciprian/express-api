
const express = require('express');

const bookRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },

];

bookRouter.route('/')
  .get((req, res) => {
    res.render('bookListView', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' },
      ],
      title: 'Library',
      books,
    });
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    console.log('bookroute:', id, books[id], req.params)
    res.render('bookView', {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' },
      ],
      title: 'Library',
      book: books[id],
    });
  });

module.exports = bookRouter;
