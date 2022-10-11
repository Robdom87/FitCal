const router = require('express').Router();
// const programRoutes = require('./program-routes');
// const programWorkoutRoutes = require('./programWorkouts-routes');
const sessionRoutes = require('./session-routes');
const sessionWorkoutRoutes = require('./sessionWorkouts-routes');
// const logRoutes = require('./log-routes');
// const weightRoutes = require('./weight-routes');

// router.use('/program', programRoutes);
// router.use('/program/wkts', programWorkoutRoutes);
router.use('/session', sessionRoutes);
router.use('/session/wkts', sessionWorkoutRoutes);
// router.use('/logs', logRoutes);
// router.use('/weights', weightRoutes);

module.exports = router;