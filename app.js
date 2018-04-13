const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
//const sql = require('mssql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookieParser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

/*
const config = {
  user: 'library',
  password: 'bundesligaA1',
  server: 'plibrary.database.windows.net',
  database: 'PLibrary',

  options: {
    encrypt: true,
  },
};

sql.connect(config).then(() => {
  console.log('CONNECTED TO DATABASE')
}).catch((err) => {
  console.log('ERROR CONNECTING TO DATABSE:', err)
});
*/
app.use(morgan('tiny'));

/*
app.use((req, res, next) => {
  console.log('my middleware');
  next();
})
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/paasport.js')(app);
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

app.listen(port, () => {
  console.log(`server running on port ${chalk.green(port)}`);
});
