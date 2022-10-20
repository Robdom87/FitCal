const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage',
  {
    logged_in: req.session.logged_in,
  });
});

router.get('/nutrition', (req, res) => {
  res.render('nutrition',
  {
    logged_in: req.session.logged_in,
  });
});

router.get('/bmi', (req, res) => {
  res.render('bmi',
  {
    logged_in: req.session.logged_in,
  });
});

//exercise and chart both require log in to use
router.get('/exercise', (req, res) => {
  if (req.session.logged_in) {
    res.render('exercise', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');

});

router.get('/chart', (req, res) => {
  if (req.session.logged_in) {
    res.render('chart', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');

});

router.get('/forum', (req, res) => {
  if (req.session.logged_in) {
    res.render('forum', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');

});

router.get('/login', (req, res) => {
  //if user already logged in send him to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;