const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines');
const PORT = process.env.PORT || 3000;


//HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES
const router = require('./routes/router');
app.use('/', router);

app.listen(PORT, () => console.log('App listening on port: ' + PORT));


