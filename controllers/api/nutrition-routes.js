const router = require('express').Router();
const fetch = require('node-fetch');


// The `/api/nutrition` endpoint
router.get('/:url', async (req, res) => {
    // call Nutrition API from the backend
    try {
        let response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${req.params.url}`, {
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