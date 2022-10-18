const router = require('express').Router();

const sessionRoutes = require('./session-routes');
const nutritionRoutes = require('./nutrition-routes');
const userRoutes = require("./user-routes");
const exerciseRoutes = require('./exercise-routes');
const programRoutes = require('./program-routes');
const chartRoutes = require('./chart-routes');
//forum 
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


router.use('/session', sessionRoutes);
router.use('/nutrition',nutritionRoutes);
router.use("/users", userRoutes);
router.use('/exercise',exerciseRoutes);
router.use('/program', programRoutes);
router.use('/chart', chartRoutes);
//forum
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);



module.exports = router;