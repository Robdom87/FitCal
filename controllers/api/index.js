const router = require('express').Router();

const sessionRoutes = require('./sessionRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const userRoutes = require("./userRoutes");
const exerciseRoutes = require('./exerciseRoutes');
const programRoutes = require('./programRoutes');
const chartRoutes = require('./chartRoutes');
//forum 
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


router.use('/session', sessionRoutes);
router.use('/nutrition',nutritionRoutes);
router.use("/users", userRoutes);
router.use('/exercise',exerciseRoutes);
router.use('/program', programRoutes);
//forum
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/chart', chartRoutes);


module.exports = router;