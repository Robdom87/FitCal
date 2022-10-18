const router = require('express').Router();
const { SessionWorkouts } = require('../../models');

// The `/api/session/wkts` endpoint

router.post('/', async (req, res) => {
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