const Express = require('express');
const router = Express.Router();
const Url = require('../models/Url');


router.get('/:urlId', async(req,res) => {
    try {
        const url = await Url.findOne({
            urlId: req.params.urlId
        });
        if(url) {
            url.click++;
            url.save();
            return res.redirect(url.origUrl);
        } else {
            res.status(404).json('Not Found');
        }
    } catch(err) {
        console.log(err);
        res.status(500).json('Server Error');
    }
})

module.exports = router;