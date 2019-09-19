const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8002;
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(require('./routes'));

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`); 
});
 