const express = require('express');
const router = express.Router();
const db = require('../models/article');
const scraper = require('../functions/scraper');


router.get('/', (req, res) => {
    db.article.find((err, data) => {
        res.render('home', {articles: data});
    })
})

router.get('/scrape', (req, res) => {
    db.article.collection.remove();
    scraper(articles => {
        let stop = 10;
        if(articles.length < 10)
            stop = articles.length;

        for(let i = 0; i < stop; i++){
            const doc = new db.article({
                headline: articles[i].title,
                summary: articles[i].summary,
                link: articles[i].href
            })

            doc.save();
        }
    })
})

router.post('/save', (req, res) => {
    console.log(req.body);
})

module.exports = router;