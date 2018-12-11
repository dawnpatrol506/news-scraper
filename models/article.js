const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    headline: String,
    summary: String,
    link: String
});

const article = mongoose.model('article', articleSchema);
const saved_article = mongoose.model('article', articleSchema);

module.exports = {
    article,
    saved_article
}
