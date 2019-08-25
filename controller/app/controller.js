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

module.exports = {
    getOmdbapiMovie,
    getEmailInfoFinder,
    getIpInfoFinder,
   	getInfoFinderPhoneNumber
};