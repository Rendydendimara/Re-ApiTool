const router = require('express').Router();
const appControler = require('../controller/app/controller');

router.get('/', (req, res, next) => {
	// get home page re-api
	appControler.getReApiHomePage(req, res, next);
})

router.get('/movie', (req, res, next) => {
	// send movies view
	appControler.getOmdbapiMovie(req, res, next);
});

router.get('/email', (req, res, next) => {
	// send email view
	appControler.getEmailInfoFinder(req, res, next);
});

router.get('/ip', (req, res, next ) => {
	// send ip view
	appControler.getIpInfoFinder(req, res, next);
});

router.get('/phonenumber', (req, res ,next) => {
	// send phonenumbere view
	appControler.getInfoFinderPhoneNumber(req, res, next);
});

router.get('/port-scanning', (req, res ,next) => {
	// send portscanning view
	appControler.getPortScanningView(req, res, next);
});

router.get('/subdomain-finder', (req, res ,next) => {
	// send subdomain-finder view
	appControler.getSubdomainFinder(req, res, next);
});

router.get('/dns-history-checker', (req, res ,next) => {
	// send dnshistoryChecker view
	appControler.getDNSHistoryChecker(req, res, next);
});

router.get('/reverse-ip-lookup', (req, res ,next) => {
	// send reverseip-lookup view
	appControler.getReverseIpLookup(req, res, next);
});

router.get('/contact', (req, res ,next) => {
	// send reverseip-lookup view
	appControler.getContactView(req, res, next);
});

router.get('/about', (req, res ,next) => {
	// send reverseip-lookup view
	appControler.getAboutView(req, res, next);
});

router.get('/feedback', (req, res ,next) => {
	// send reverseip-lookup view
	appControler.getFeebackView(req, res, next);
});


module.exports = router;