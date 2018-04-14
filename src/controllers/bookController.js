

module.exports = function bookController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log('Connected corectly to server');

        const db = client.db(dbName);

        const col = await db.collection('books')
        const books = await col.find().toArray();
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books,
          },
        );
      } catch (err) {
        console.log(err.strack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        console.log('Connected corectly to server');

        const db = client.db(dbName);

        const col = await db.collection('books')

        const book = await col.findOne({ _id: new ObjectID(id) });

        console.log(book);
        res.render('bookView', {
          nav,
          title: 'Library',
          book,
        });
      } catch (err) {
        console.log(err.strack);
      }
    }());
  }
  function middleware(req, res, next) {
    //if (req.user) {
    next();
    //} else {
    // res.redirect('/');
    //}
  }

  return {
    getIndex,
    getById,
    middleware,
  }
}