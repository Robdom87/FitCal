const router = require('express').Router();

router.get('/',(req, res) => {
  res.render('homepage');
});
    
router.get('/nutrition', (req, res) => {
    res.render('nutrition');
});

router.get('/bmi', (req, res) => {
  res.render('bmi');
});

router.get('/exercise', (req, res) => {
  res.render('exercise');
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