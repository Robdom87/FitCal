const router = require('express').Router();
const { ProgramWorkouts } = require('../../models');

// The `/api/program/wkts` endpoint

router.post('/', async (req, res) => {
  // create a new program
  try {
    //req.body for bulk create must be in array of objects
    //object should be like
      // {
      //     program_id: 
      //     exercise_name:
      //     exercise_equipment:
      //     exercise_instructions:
      //     set_amount: 
      //     rep_amount: 
      //     weight: 
      //     weight_type: 
      // }

    const programData = await ProgramWorkouts.bulkCreate(req.body);
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;