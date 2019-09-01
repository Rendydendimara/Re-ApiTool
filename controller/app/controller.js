async function getOmdbapiMovie (req, res, next) {
    res.render('movie');
}

async function getEmailInfoFinder (req, res, next) {
	res.render('emailInfoFinder')

}

async function getIpInfoFinder (req, res, next) { 
	res.render('ipInfoFinder');

}

async function getInfoFinderPhoneNumber (req, res, next) { 
	res.render('phoneNumberInfoFinder');
}

async function getReApiHomePage(req, res, next) {
	res.render('reapiHomePage');
}

async function getPortScanningView(req, res, next) {
	res.render('portScanning');
}

async function getSubdomainFinder(req, res, next) {
	res.render('subdomainFinder');
}

async function getDNSHistoryChecker(req, res, next) {
	res.render('dnsHistoryChecker');
}

async function getReverseIpLookup(req, res, next) {
	res.render('reverseIpLookup');
}

async function getContactView(req, res, next) {
	res.render('contact');
}

async function getAboutView(req, res, next) {
	res.render('about');
}

async function getFeebackView(req, res, next) {
	res.render('feedback');
}

module.exports = {
	getReApiHomePage,
    getOmdbapiMovie,
    getEmailInfoFinder,
    getIpInfoFinder,
   	getInfoFinderPhoneNumber,
   	getPortScanningView,
   	getSubdomainFinder,
   	getDNSHistoryChecker,
   	getReverseIpLookup,
   	getContactView,
   	getAboutView,
	getFeebackView
};