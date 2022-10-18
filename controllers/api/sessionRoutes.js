const router = require('express').Router();
const { Session, SessionWorkouts } = require('../../models');

// The `/api/session` endpoint
router.get('/', async (req, res) => {
  // find all sessions
  try {
    const sessionData = await Session.findAll({
      include: [{ model: SessionWorkouts }]
    });
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:date', async (req, res) => {
  // find one session by its `id` value
  // be sure to include its associated workouts
  try {
    const sessionData = await Session.findOne({ where: { date : req.params.date } });
    if (!sessionData) {
      res.status(404).json({ message: 'No session found with this id!' });
      return;
    }
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new session
  try {
    const sessionData = await Session.create(req.body);
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/wkts/', async (req, res) => {
  // create a new program
  try {
    //req.body for bulk create must be in array of objects
    //object should be like
      // {
      //     session_id: 
      //     exercise_name: 
      //     set_number: 
      //     rep_amount: 
      //     weight: 
      //     weight_type: 
      //     comments:
      // }

    const sessionData = await SessionWorkouts.bulkCreate(req.body);
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;