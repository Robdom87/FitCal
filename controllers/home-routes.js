const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    User,
    Post,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage',
  {
    logged_in: req.session.logged_in,
  });
});

router.get('/nutrition', (req, res) => {
  res.render('nutrition',
  {
    logged_in: req.session.logged_in,
  });
});

router.get('/bmi', (req, res) => {
  res.render('bmi',
  {
    logged_in: req.session.logged_in,
  });
});

//exercise and chart both require log in to use
router.get('/exercise', (req, res) => {
  if (req.session.logged_in) {
    res.render('exercise', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');

});

router.get('/chart', (req, res) => {
  if (req.session.logged_in) {
    res.render('chart', {
      logged_in: req.session.logged_in,
    });
    return;
  }
  res.redirect('/login');

});

router.get('/forum', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      let allPostsData =  await Post.findAll({
        attributes: ["id", "post_content", "title", "created_at"],
        order: [
            ["created_at", "DESC"]
        ],
        include: [{
                model: User,
                attributes: ["name"], //matches with User.js definition
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["name"],
                }
            }
        ]
      });
      console.log(allPostsData);
      const posts = allPostsData.map((post) => post.get({ plain: true }));
      res.render('forum', {
        logged_in: req.session.logged_in,
        posts
      });
    } catch (err) {
      res.status(500).json(err.message);

    }
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  //if user already logged in send him to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;