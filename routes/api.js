const router = require('express').Router();
const apiController = require('../controller/api/controller');

router.post('/omdbapi-movie', (req, res, next) => {
	apiController.getOMDBAPIMovies(req, res, next);
});

module.exports = router;
