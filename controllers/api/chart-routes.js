const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Session, SessionWorkouts } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/chart` endpoint
router.get('/exercises', withAuth, async (req, res) => {
  // find all distinct exercises
  try {
    const exerciseData = await SessionWorkouts.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('exercise_name')), 'exercise_name'],
      ]
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/chart/exercise?name=` endpoint
router.get('/exercise', withAuth, async (req, res) => {
  // count all exercises with that name
  try {
    const exerciseData = await SessionWorkouts.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(`(
                            SELECT COUNT(exercise_name)
                            FROM sessionWorkouts AS set_count
                            WHERE
                                user_id = ${req.session.user_id}
                                AND exercise_name = "${req.query.name}"
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

// The `/api/chart/dates?start=&end=` endpoint
router.get('/dates', withAuth, async (req, res) => {
  // count all workout dates between the time period
  try {
    const exerciseData = await Session.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(`(
                            SELECT COUNT(date) FROM session 
                            WHERE 
                              user_id = ${req.session.user_id}
                              AND date BETWEEN '${req.query.start}' AND '${req.query.end}'
                        )`),
            'workout_count'
          ]
        ]
      }
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/chart/weight?start=&end=&name=` endpoint
router.get('/weight', withAuth, async (req, res) => {
  // pull in all data points within time period and for selected workout
  //only pull in weight data
  try {
    const allSessionDates = await sequelize.query(
      `SELECT session.date, sessionWorkouts.exercise_name, sessionWorkouts.weight 
    FROM sessionWorkouts 
    JOIN session ON session.id = sessionWorkouts.session_id 
    WHERE session.date BETWEEN '${req.query.start}' AND '${req.query.end}'
    AND sessionWorkouts.exercise_name = '${req.query.name}'
    AND sessionWorkouts.user_id = ${req.session.user_id}`, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(allSessionDates);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// The `/api/chart/volume?start=&end=&name=` endpoint
router.get('/volume', withAuth, async (req, res) => {
  // pull in all data points within time period and for selected workout
  //only pull in volume column (product of reps * weight)
  try {
    const allSessionDates = await sequelize.query(
      `SELECT session.date, sessionWorkouts.exercise_name, sessionWorkouts.set_number, sessionWorkouts.weight*sessionWorkouts.rep_amount AS volume 
    FROM sessionWorkouts 
    JOIN session ON session.id = sessionWorkouts.session_id 
    WHERE session.date BETWEEN '${req.query.start}' AND '${req.query.end}'
    AND sessionWorkouts.exercise_name = '${req.query.name}'
    AND sessionWorkouts.user_id = ${req.session.user_id}`, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(allSessionDates);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;