const router = require('express').Router();
const apiController = require('../controller/api/controller');

router.post('/movie', (req, res, next) => {
	// post to omdbapi to get movies
	apiController.getMoviesOmdbApi(req, res, next);
});

router.post('/ip', (req, res, next) => {
	// post to ipgelocation.io get inform from ip address
	apiController.getIpGeolocationIOApi(req, res, next);
});

router.post('/email', (req, res, next) => {
	// post to antideo api to get email information
	apiController.getEmailInfoAntideoApi(req, res, next);
});

router.post('/phonenumber', (req, res, next) => {
	// post to antideo api to get phone number inform
	apiController.getPhonenumberInfoAntideoApi(req, res, next);
});

router.post('/port-scanning', (req, res, next) => {
	// post to https://tools.hack.co.id/portscanner/ to get port inform
	apiController.portScanning(req, res, next);
});

router.post('/subdomain-finder', (req, res, next) => {
	// post to https://tools.hack.co.id/subdomain/ to get subdomain inform
	apiController.subdomainFinder(req, res, next);
});

router.post('/reverse-ip-lookup', (req, res, next) => {
	// post to https://tools.hack.co.id/reverseip/ to get ip reverse by lookup inform
	apiController.reverseIpLookup(req, res, next);
});

router.post('/dnshistory-checker', (req, res, next) => {
	// post to https://tools.hack.co.id/dns/ to get dns history inform
	apiController.dnsHistoryChecker(req, res, next);
});

module.exports = router;
