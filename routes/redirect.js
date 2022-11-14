const Express = require('express');
const router = Express.Router();
const Url = require('../models/Url');

let mysql = require('mysql');
let config = require('../config/mysql-config');
let connection = mysql.createConnection(config);



router.get('/:urlId', async(req,response) => {
    try {
        connection.query(`SELECT * from Urls where urlID = "${req.params.urlId}"`, (err, res, fields) => {
            if(err) throw err;
            console.log(res);

            if(res.length != 0 ) {
                return response.redirect(res[0].origUrl) // ISSUE HERE
            } else {
                response.status(404).json('NOT FOUND');
            }

        })
        // if(url) {
        //     url.clicks++;
        //     url.save();
        //     return res.redirect(url.origUrl);
        // } else {
        //     res.status(404).json('Not Found');
        // }

    } catch(err) {
        console.log(err);
        response.status(500).json('Server Error');
    }
})








// router.get('/:urlId', async(req,res) => {
//     try {
//         const url = await Url.findOne({
//             urlId: req.params.urlId
//         });
//         if(url) {
//             url.clicks++;
//             url.save();
//             return res.redirect(url.origUrl);
//         } else {
//             res.status(404).json('Not Found');
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).json('Server Error');
//     }
// })

module.exports = router;