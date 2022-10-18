const router = require('express').Router();

const sessionRoutes = require('./sessionRoutes');
const nutritionRoutes = require('./nutritionRoutes');
const userRoutes = require("./userRoutes");
const exerciseRoutes = require('./exerciseRoutes');
const programRoutes = require('./programRoutes');
const chartRoutes = require('./chartRoutes');
//forum 
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


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