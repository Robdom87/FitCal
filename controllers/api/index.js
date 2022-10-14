const router = require('express').Router();

const sessionRoutes = require('./session-routes');
const sessionWorkoutRoutes = require('./sessionWorkouts-routes');
const nutritionRoutes = require('./nutritionRoutes');
const userRoutes = require("./userRoutes");
const exerciseRoutes = require('./exerciseRoutes');
const programRoutes = require('./program-routes');
const programWorkoutRoutes = require('./programWorkouts-routes');

router.use('/session', sessionRoutes);
router.use('/session/wkts', sessionWorkoutRoutes);
router.use('/nutrition',nutritionRoutes);
router.use("/users", userRoutes);
router.use('/exercise',exerciseRoutes);
router.use('/program', programRoutes);
router.use('/program/wkts', programWorkoutRoutes);


module.exports = router;