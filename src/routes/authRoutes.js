const express = require('express');

const { MongoClient } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected corectly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const results = await col.insertOne(user);
          console.log(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          console.log(err);
        }
      }());
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;