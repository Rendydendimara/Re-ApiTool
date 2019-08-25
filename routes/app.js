const router = require('express').Router();
const appControler = require('../controller/app/controller');

router.get('/movie', (req, res, next) => {
	appControler.getOmdbapiMovie(req, res, next);
});

router.get('/email', (req, res, next) => {
	appControler.getEmailInfoFinder(req, res, next);
});

router.get('/ip', (req, res, next ) => {
	appControler.getIpInfoFinder(req, res, next);
});

router.get('/phonenumber', (req, res ,next) => {
	appControler.getInfoFinderPhoneNumber(req, res, next);
});


module.exports = router;