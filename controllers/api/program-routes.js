const router = require('express').Router();
const { Program, ProgramWorkouts } = require('../../models');

// The `/api/program` endpoint

router.get('/', async (req, res) => {
  // find all Programs
  try {
    const programData = await Program.findAll();
    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/id/:id', async (req, res) => {
  // find one program by its `id` value
  // be sure to include its associated workouts
  try {
    const programData = await Program.findByPk(req.params.id, {
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

router.get('/query', async (req, res) => {
  // find program id with the name
  try {
    const programData = await Program.findOne({ where: { program_name : req.query.name } });
    if (!programData) {
      res.status(404).json({ message: 'No program found with this name!' });
      return;
    }

    res.status(200).json(programData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new program
  try {
    const programData = await Program.create(req.body);
    res.status(200).json(programData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
