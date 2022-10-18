const router = require('express').Router();
const { Program, ProgramWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');


// The `/api/program` endpoint
router.get('/', withAuth, async (req, res) => {
  // find all Programs for specific user
  try {
    const programData = await Program.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/program/id/` endpoint
router.get('/id/:id', withAuth, async (req, res) => {
  // find one program by its `id` value among the user programs and include all workouts
  try {
    const programData = await Program.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id
      },
      include: [{ model: ProgramWorkouts }]
    });

    if (!programData) {
      res.status(404).json({ message: 'No program found with this id!' });
      return;
    }
    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/program/query?name=` endpoint
router.get('/query', withAuth, async (req, res) => {
  // find program id with the name among the users workouts
  try {
    const programData = await Program.findOne({
      where: {
        user_id: req.session.user_id,
        program_name: req.query.name
      }
    });
    if (!programData) {
      res.status(404).json({ message: 'No program found with this name!' });
      return;
    }

    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST Routes
// The `/api/program/` endpoint
router.post('/', withAuth, async (req, res) => {
  // create a new program
  try {
    const programData = await Program.create({
      program_name: req.body.program_name,
      user_id: req.session.user_id
    });
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// The `/api/program/wkts/` endpoint
router.post('/wkts/', withAuth, async (req, res) => {
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
    //     user_id:
    // }
    for (let i = 0; i < req.body.length; i++) {
      req.body[i].user_id = req.session.user_id;
    }
    const programData = await ProgramWorkouts.bulkCreate(req.body);
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
