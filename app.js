const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8002;
const morgan = require('morgan');
const helmet = require('helmet');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(helmet());

// static file midleware
app.use('/re-api/', express.static(path.join(__dirname, './public')));
app.use('/re-api/movie', express.static(path.join(__dirname,'./public')));
app.use('/re-api/ip', express.static(path.join(__dirname,'./public')))
app.use('/re-api/email', express.static(path.join(__dirname,'./public')))
app.use('/re-api/phonenumber', express.static(path.join(__dirname,'./public')))
app.use('/re-api/subdomain-finder', express.static(path.join(__dirname,'./public')))
app.use('/re-api/dns-history-checker', express.static(path.join(__dirname,'./public')))
app.use('/re-api/reverse-ip-lookup', express.static(path.join(__dirname,'./public')))

app.use(require('./routes'));

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`); 
});
 