const router = require('express').Router();
const fetch = require('node-fetch');


// The `/api/exercise` endpoint
router.get('/:query', async (req, res) => {
    // find all sessions
    try {
        let response = await fetch(`https://api.api-ninjas.com/v1/exercises?${req.params.query}`, {
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