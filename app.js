const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8002;

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use('/app/omdbapi', express.static(path.join(__dirname,'./public')));
app.use('/app/omdbapi-movie-id', express.static(path.join(__dirname,'./public')));

app.use(require('./routes'));

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`); 
});
 