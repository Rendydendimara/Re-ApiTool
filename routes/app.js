const router = require('express').Router();
const appControler = require('../controller/app/controller');

router.get('/omdbapi', (req, res, next) => {
	appControler.getOmdbapiMovie(req, res, next);
});

module.exports = router;