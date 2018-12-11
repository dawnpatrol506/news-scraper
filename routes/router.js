const express = require('express');
const router = express.Router();
const db = require('../models/article');
const scraper = require('../functions/scraper');


router.get('/', (req, res) => {
    db.article.find((err, data) => {
        if(err){
            res.render('home', {err: 'An error occurred'});
        }
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
        res.json({msg: 'success'});
    })
})

router.post('/save', (req, res) => {
    const id = req.body.id;
    db.article.findOne({_id : id}, (err, doc) => {
        if(err) throw err;
        const saveDoc = new db.saved_article({
            headline: doc.headline,
            summary: doc.summary,
            link: doc.link
        });
        
        saveDoc.save();
        res.json({msg: 'success'});
    })
})

router.delete('/deleteSavedArticle', (req, res) => {
    let id = req.body.id;
    console.log('ID: ', id);
    db.saved_article.deleteOne({_id: id}, err => {
        if(err){
            res.json({msg: err});
        }

        res.json({msg: 'success'});
    })
})

router.get('/savedArticles', (req, res) => {
    db.saved_article.find((err, data) => {
        if(err){
            res.render('savedArticles', { err });
        }
        console.log(data);
        res.render('savedArticles', {articles: data});
    })
})

router.delete('/clearArticles', (req, res) => {
    db.article.collection.remove();
    res.json({msg: 'success'});
})

module.exports = router;