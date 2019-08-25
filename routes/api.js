const router = require('express').Router();
const apiController = require('../controller/api/controller');

router.post('/movie', (req, res, next) => {
	apiController.getMoviesOmdbApi(req, res, next);
});

router.post('/ip', (req, res, next) => {
	apiController.getIpGeolocationIOApi(req, res, next);
});

router.post('/email', (req, res, next) => {
	apiController.getEmailInfoAntideoApi(req, res, next);
});


router.post('/phonenumber', (req, res, next) => {
	apiController.getPhonenumberInfoAntideoApi(req, res, next);
});

module.exports = router;
