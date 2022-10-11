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

module.exports = router;