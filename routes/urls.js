const Express = require('express');
const router = Express.Router();

const shortid = require('shortid');
const Url = require('../models/Url');
const utils = require('../utils/utils');


const base = "https://shortUrl-Gen";


require('dotenv').config({ path: '..config/.env' });



let mysql = require('mysql');
let config = require('../config/mysql-config');
let connection = mysql.createConnection(config);



// ShortURL GENERATOR - MYSQL
router.post('/shortUrl', async (req, res) => {

    const { origUrl } = req.body;

    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
        try {
            // let url = await Url.findOne({ origUrl });

            // Select origUrl from URLS Where origUrl = origUrl
            connection.query(`SELECT * FROM Urls where origUrl = "${origUrl}"`, function (err, result, fields) {
                if (err) throw err;
                console.log(result);

                if(result.length != 0) {
                    res.json(result);
                } else {
                    const shortUrl = `${base}/${urlId}`;
                    var sql = `INSERT INTO Urls(urlId,origUrl,shortUrl) VALUE(
                        "${urlId}",
                        "${origUrl}",
                        "${shortUrl}"
                    )`;

                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                        res.json({shortUrl: shortUrl});
                    });
                }


            });

            //
            // if (url) {
            //     res.json(url)
            // } else {
            //     const shortUrl = `${base}/${urlId}`;

            //     url = new Url({
            //         origUrl,
            //         shortUrl,
            //         urlId,
            //         date: new Date(),
            //     });

            //     await url.save();
            //     res.json(url);
            // }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(400).json('Invalid Original Url');
    }
})




// ShortURL GENERATOR - MONGODB
router.post('/short', async (req, res) => {
    const { origUrl } = req.body;
    // const base = process.env.BASE;

    const urlId = shortid.generate();
    if (utils.validateUrl(origUrl)) {
        try {
            let url = await Url.findOne({ origUrl });
            if (url) {
                res.json(url)
            } else {
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    } else {
        res.status(400).json('Invalid Original Url');
    }
})


module.exports = router;