const express = require('express');
const path = require('path');
const routes = require('./controllers');
// import sequelize connection
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Used to call information from the database
app.use(routes);
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for bmi
app.get('/bmi', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/html/bmi.html'))
);

// GET Route for nutrition
app.get('/nutrition', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/html/nutrition.html'))
);

// GET Route for exercise
app.get('/exercise', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/html/exercise.html'))
);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on http://localhost:${PORT}/`);
    });
  });