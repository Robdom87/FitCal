const express = require('express');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
// import sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;
const app = express();

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Come on in, sir.',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // will check every 10 minutes
    expiration: 1000 * 60 * 30 // will expire after 30 minutes
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Used to call information from the database
app.use(routes);
app.use(express.static(path.join(__dirname, '/public')));

//{force: true}

sequelize.sync().then(() => {
  
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}/`);
    });
  });