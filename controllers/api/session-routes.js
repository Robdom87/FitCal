const router = require('express').Router();
const { Session, SessionWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');


// The `/api/session` endpoint
router.get('/', withAuth, async (req, res) => {
  // find all sessions for user with workouts
  try {
    const sessionData = await Session.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: SessionWorkouts }]
    });
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/session/` endpoint
router.get('/:date', withAuth, async (req, res) => {
  // find one session by its `id` value
  // be sure to include its associated workouts
  //for select user
  try {
    const sessionData = await Session.findOne({
      where: {
        user_id: req.session.user_id,
        date: req.params.date
      }
    });
    if (!sessionData) {
      res.status(404).json({ message: 'No session found with this id!' });
      return;
    }
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST routes
// The `/api/session` endpoint
router.post('/', withAuth, async (req, res) => {
  // create a new session
  try {
    const sessionData = await Session.create({
      date: req.body.date,
      user_id: req.session.user_id
    });
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// The `/api/session/wkts` endpoint
router.post('/wkts/', withAuth, async (req, res) => {
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
    //     user_id:
    // }
    for (let i=0; i < req.body.length; i++){
      req.body[i].user_id = req.session.user_id;
    }
    
    const sessionData = await SessionWorkouts.bulkCreate(req.body);
    res.status(200).json(sessionData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;