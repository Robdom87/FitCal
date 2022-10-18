const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');



// The `/api/exercise` endpoint
router.get('/:url', withAuth, async (req, res) => {
    // used to call Exercise API
    try {
        let response = await fetch(`https://api.api-ninjas.com/v1/exercises?${req.params.url}`, {
            headers: {
                'X-Api-Key': process.env.API_Key
            }
        });
        let data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


module.exports = router;