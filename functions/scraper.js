const axios = require('axios');
const cheerio = require('cheerio');

const scraper = (callback) => {
    axios.get('https://www.npr.org/sections/news/')
        .then(response => {
            const $ = cheerio.load(response.data);
            const articles = [];
            $('.title').each( (i, elem) => {
                articles.push({
                    title: $(elem).text(),
                    summary: $(elem).next().text(),
                    href: $(elem).children('a').attr('href')
                });
            })
            callback(articles);
        })
}

module.exports = scraper;