const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Session, SessionWorkouts } = require('../../models');

// The `/api/chart` endpoint
router.get('/exercises', async (req, res) => {
  // find all exercises
  try {
    const exerciseData = await SessionWorkouts.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('exercise_name')) ,'exercise_name'],
        ]
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/exercise', async (req, res) => {
    // find all exercises
    try {
      const exerciseData = await SessionWorkouts.findOne({ 
            attributes: {
                include: [
                    [
                        // Note the wrapping parentheses in the call below!
                        sequelize.literal(`(
                            SELECT COUNT(exercise_name)
                            FROM sessionWorkouts AS set_count
                            WHERE
                                exercise_name = "${req.query.name}"
                        )`),
                        'set_count'
                    ]
                ]
            }
    });
      res.status(200).json(exerciseData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //SELECT COUNT(exercise_name) FROM sessionWorkouts AS set_count WHERE exercise_name = ${req.params.name}

// router.get('/:date', async (req, res) => {
//   // find one session by its `id` value
//   // be sure to include its associated workouts
//   try {
//     const sessionData = await Session.findOne({ where: { date : req.params.date } });
//     if (!sessionData) {
//       res.status(404).json({ message: 'No session found with this id!' });
//       return;
//     }
//     res.status(200).json(sessionData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   // create a new session
//   try {
//     const sessionData = await Session.create(req.body);
//     res.status(200).json(sessionData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/wkts/', async (req, res) => {
//   // create a new program
//   try {
//     //req.body for bulk create must be in array of objects
//     //object should be like
//       // {
//       //     session_id: 
//       //     exercise_name: 
//       //     set_number: 
//       //     rep_amount: 
//       //     weight: 
//       //     weight_type: 
//       //     comments:
//       // }

//     const sessionData = await SessionWorkouts.bulkCreate(req.body);
//     res.status(200).json(sessionData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


module.exports = router;