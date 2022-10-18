const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Session, SessionWorkouts } = require('../../models');
const { Op } = require('sequelize');

// The `/api/chart` endpoint
router.get('/exercises', async (req, res) => {
  // find all exercises
  try {
    const exerciseData = await SessionWorkouts.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('exercise_name')), 'exercise_name'],
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

router.get('/dates', async (req, res) => {
  // find all exercises
  try {
    const exerciseData = await Session.findOne({
      attributes: {
        include: [
          [
            //find out how to do nested if statement count
            // Note the wrapping parentheses in the call below!
            sequelize.literal(`(
                            SELECT COUNT(date) FROM session WHERE date BETWEEN '${req.query.start}' AND '${req.query.end}'
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

router.get('/weight', async (req, res) => {
  // find weight
  try {
    const allSessionDates = await sequelize.query(
      `SELECT session.date, sessionWorkouts.exercise_name, sessionWorkouts.weight 
    FROM sessionWorkouts 
    JOIN session ON session.id = sessionWorkouts.session_id 
    WHERE session.date BETWEEN '${req.query.start}' AND '${req.query.end}'
    AND sessionWorkouts.exercise_name = '${req.query.name}'`, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(allSessionDates);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/volume', async (req, res) => {
  // find weight
  try {
    const allSessionDates = await sequelize.query(
      `SELECT session.date, sessionWorkouts.exercise_name, sessionWorkouts.set_number, sessionWorkouts.weight*sessionWorkouts.rep_amount AS volume 
    FROM sessionWorkouts 
    JOIN session ON session.id = sessionWorkouts.session_id 
    WHERE session.date BETWEEN '${req.query.start}' AND '${req.query.end}'
    AND sessionWorkouts.exercise_name = '${req.query.name}'`, { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(allSessionDates);
  } catch (err) {
    res.status(500).json(err.message);
  }
});




module.exports = router;