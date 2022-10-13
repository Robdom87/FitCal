const router = require('express').Router();
const fetch = require('node-fetch');


// The `/api/nutrition` endpoint
router.get('/:query', async (req, res) => {
    // find all sessions
    try {
        let response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${req.params.query}`, {
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