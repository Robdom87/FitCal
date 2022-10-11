const router = require('express').Router();
const sessionRoutes = require('./session-routes');
const sessionWorkoutRoutes = require('./sessionWorkouts-routes');

router.use('/session', sessionRoutes);
router.use('/session/wkts', sessionWorkoutRoutes);

module.exports = router;