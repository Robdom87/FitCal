const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//retrieve all posts
router.get("/forum", withAuth, async (req, res) => {
    Post.findAll({
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
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create post
router.post('/forum', withAuth, async (req, res) => {
    Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;