const request = require('request');
const apikey = require('../../config/apikey');
const cheerio = require('cheerio');


// request url to web service api
const omdbapiUrl = `http://www.omdbapi.com/?apikey=${apikey.OmdbApi}`;
const ipGeolocationIoUrl =`https://api.ipgeolocation.io/ipgeo?apiKey=${apikey.IpGeolocationIo}`; 
const phonenumberInfoAntiDeoUrl = `https://api.antideo.com/phone/id/`; 
const emailInfoAntiDeoUrl = `https://api.antideo.com/email/`;
const portScanningEthicalHackerIndonesiaUrl = 'https://tools.hack.co.id/portscanner/';
const subdomainFinderEthicalHackerIndonesiaUrl = 'https://tools.hack.co.id/subdomain/';
const reverseIpLookupEthicalHackerIndonesiaUrl = 'https://tools.hack.co.id/reverseip/';
const dnsHistoryCheckerEthicalHackerIndonesiaUrl = 'https://tools.hack.co.id/dns/';


// variabel defined error type
const antideoSubsriptionNotSupportedOnFree = 'IP to geolocation lookup for domain or service name is not supported on free subscription.';


const getRequestOMDBAPIBySeacrchMovieName = (movieSearch) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan requst GET ke OMDBAPI untk mendapatkan daftar movie berdarkan nama movie
 	request.get(`${omdbapiUrl}&s=${movieSearch}`, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
 	});
}));

const getRequestOMDBAPIBySeacrchMovieId = (movieId) => (new Promise((resolve, reject) => {
	// fungsi untk melakukan request GET ke OMDBAPI untuk mendapatkan datail dari movie tertentu berdarkan ID movie
 	request.get(`${omdbapiUrl}&i=${movieId}`, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
	});
}));

const getRequestIpGeolocationIoIp = (ipFind) => (new Promise((resolve, reject) => {
	// fungsi utuk melakukan request GET ke IpGeolocation.io untku mendapatkan info dari ip address yang di cari
	request.get(`${ipGeolocationIoUrl}&ip=${ipFind}&lang=id`, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
	});
}));

const getRequestPhoneNumberInfoAntiDeo = (phonenumberFind) => (new Promise((resolve, reject) => {
	// fungsi utuk melakukan request GET ke api.antideo/phone/id/phonenumber untku mendapatkan info dari phonenumber yang di cari
	request.get(`${phonenumberInfoAntiDeoUrl}/${phonenumberFind}`, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
	});
}));

const getRequestEmailInfoAntideoApi = (emailFind) => (new Promise((resolve, reject) => {
	// fungsi utuk melakukan request GET ke api.antideo/email/user@email.com untuk mendapatkan info dari email yang di cari
	request.get(`${emailInfoAntiDeoUrl}/${emailFind}`, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
	});
}));

const getRequestPortScanningEthicalHackerIndonesia = (host) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan request POST ke https://tools.hack.co.id/portscanner/ untuk melakukan scanning port terhadap host di tuju
	request.post({url: portScanningEthicalHackerIndonesiaUrl, form: {domain: host}}, (err, httpResponse, body) => {
		if(err) reject(err); 
		else resolve({httpResponse: httpResponse, body: body});
	});
}));

const filterPortScanningEthicalHackerIndonesia = (bodyPortScanning) => (new Promise((resolve, reject) => {
	// fungsi ini digunakna untuk memfilter data hasil scrapping port scanning di ethical hacker indonesia
	const $ = cheerio.load(bodyPortScanning);
	let d = [];
	let k = [];
	let o = 0;
	let td = Array.from($("td")).map((tdata) => $(tdata).text().trim());
	for(i=0; i< td.length; i++) {
		d[o] = td[i];
		o++;
		if(o === 5) {
			o = 0;
			d.shift();
			k.push(d);
			d = [];
		}
	}	
	o = 0;
	d = [];
	k.forEach((e) => {
		let obj = {};
		obj.status = e[0];
		obj.service = e[1];
		obj.port = e[2];
		obj.description = e[3];	
		d.push(obj);
	});
	
	if(d.length < 1) resolve({type:false, msg:'host invalid'});
	else resolve({type: true, msg: d});
 }));

const findSubdomainEthicalHackerIndonesia = (domain) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan request POST ke https://tools.hack.co.id/subdomain/ untuk melakukan pencarian subdomain terhadap domain di tuju
	request.post({url: subdomainFinderEthicalHackerIndonesiaUrl, form: {domain: domain}}, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: body});
	});
}));

const filterSubdomainFinderEthicalHackerIndonesia = (bodysubdomainFinder) => (new Promise((resolve, reject) => {
	// fungsi ini digunakna untuk memfilter data hasil scrapping subdomain finder di ethical hacker indonesia
	const $ = cheerio.load(bodysubdomainFinder);
	let a = [];
	let b = [];
	let c = 0;
 	let tdlink = Array.from($('td a')).map((b)=> $(b).attr('href'));
	let tddata= Array.from($('td')).map((tdata) => $(tdata).text().trim());
 
 	for(i=0; i< tddata.length; i++) {
		a[c] = tddata[i];
		c++;
		if(c === 3) {
			c = 0;
			a.shift();
			b.push(a);
			a = [];
		}
	}
	c = 0;
	a = [];
	b.forEach((e) => {
 		let obj = {};
		obj.subdomain = e[0];
		obj.subdomainLink = tdlink[c];
		obj.hostingProvider =  e[1];	
		c++;
		a.push(obj);
	});

	if(a.length < 1 )resolve({type: false, msg: 'domain invalid'});
	else resolve({type: true, msg: a});

}));

const reverseIpLookupEthicalHackerIndonesia = (ipAddress) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan request POST ke https://tools.hack.co.id/reverseip/ untuk melakukan reverse ip lookup terhadap ip address di tuju
	request.post({url: reverseIpLookupEthicalHackerIndonesiaUrl, form: {domain: ipAddress}}, (err, httpResponse, body) => {
		if(err) reject(err);
		else resolve({httpResponse: httpResponse, body: body});
	});
}));

const filterReverseIpLookupEthicalHackerIndonesia = (bodyReverseIpLookup) => (new Promise((resolve, reject) => {
	// fungsi ini digunakna untuk memfilter data hasil scrapping reverse ip lookup di ethical hacker indonesia
	const $ = cheerio.load(bodyReverseIpLookup);
	let d = [];
	let e = [];
	let f = 0;
	let tdlink = Array.from($('td a')).map((c) => $(c).attr('href'));
	let tddata = Array.from($('td')).map((tdata) => $(tdata).text().trim());

	for(i=0; i< tddata.length; i++) {
		d[f] = tddata[i];
		f++;
		if(f === 4) {
			f = 0;
			d.shift();
			e.push(d);
			d = [];
		}
	}
 	f = 0;
	d = [];
	e.forEach((g) => {
		let obj = {}
		obj.domain = g[0];
		obj.domainLink = tdlink[f];
		obj.firstSeen = g[1];
		obj.lastSeen = g[2];
		f++;
		d.push(obj);
	})

	if(d.length < 1) resolve({type: false, msg: 'ip address invalid'});
	else resolve({type: true, msg: d});
}));

const DnsHistoryCheckerEthicalHackerIndonesia = (domain) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan request POST ke https://tools.hack.co.id/dns/ untuk melakukan pencarian dns history checker terhadap domain di tuju
	request.post({url: dnsHistoryCheckerEthicalHackerIndonesiaUrl, form: {domain: domain}}, (err, httpResponse, body) => {
		console.log(httpResponse);
		if(err) reject(err); 
		else resolve({httpResponse: httpResponse, body: body});
	});
}));

const filterDnsHistoryCheckerEthicalHackerIndonesia = (bodyDnsHistoryChecker) => (new Promise((resolve, reject) => {
	// fungsi ini digunakna untuk memfilter data hasil scrapping reverse ip lookup di ethical hacker indonesia
	const $ = cheerio.load(bodyDnsHistoryChecker);
	let j = [];
	let k = [];
	let l = 0;
	let tddata = Array.from($('td')).map((tdata) => $(tdata).text().trim());

	for(i=0; i< tddata.length; i++) {
		 j[l] = tddata[i];
		 l++;
		 if(l === 6) {
		 	l = 0;
		 	j.shift();
		 	k.push(j);
		 	j = [];
		 }
	}
	j = [];
	k.forEach((g) => {
		let obj = {}
		obj.ip = g[0];
		obj.type = g[1];
		obj.organization = g[2];
		obj.firstSeen = g[3];
		obj.lastSeen = g[4];
		j.push(obj);
	});

	if(j.length < 1) resolve({type: false, msg: 'Domain invalid'});
	else resolve({type: true, msg: j});
}));

async function getMoviesOmbdApi(req, res, next) {
	const searchMovieType = String(req.body.type);
	if(searchMovieType === 'search-movie') {
		const searchMovie = String(req.body.item)
		// request untuk mencari daftar movie
		if(!searchMovie) {
			res.status(422).json({
				type: false,
				error: 'Movie Name Required'
			});
		} else {
			console.log(`Searching ${searchMovie}`);
			try {
				const resultSearchOmdbApiMovies = await getRequestOMDBAPIBySeacrchMovieName(searchMovie);
				console.log(resultSearchOmdbApiMovies.body);
				if(resultSearchOmdbApiMovies.body.Response === 'True') {
					// response from omdbapi valid
		 			res.status(200).json({
						type: true,
						data: resultSearchOmdbApiMovies.body.Search	
					});
		 		} else {
					// response from omdbapi invalid
					res.status(200).json({
						type: false,
						error: resultSearchOmdbApiMovies.body.Error
					});
				}
			} catch (err) {
				// internal server error
				console.log('error');
				next(err);

			}
		}
	} else if(searchMovieType === 'search-movie-detail') {
		// request untuk mencari detail movie berdasarkan id
		const movieId = String(req.body.item);
 		if(!movieId) {
			res.status(422).json({
				type: false,
				error: 'Movie Id Required'
			});
		} else {
			try {
				console.log(`Search movieId ${movieId}`);
				const resultSearchOmdbApiMovieId = await getRequestOMDBAPIBySeacrchMovieId(movieId);
				console.log(resultSearchOmdbApiMovieId.body);
 				if(resultSearchOmdbApiMovieId.body.Response === 'True') {
					// response valid
					res.status(200).json({
						type: true,
						data: resultSearchOmdbApiMovieId.body
					});
				} else {
					// response invalid
					res.status(200).json({
						type: false,
						error: resultSearchOmdbApiMovieId.body.Error
					});
				}
			} catch(err) {
				// internal server error
				console.log(err);
				next(err);
			}
		}
	}
}

async function getIpGeolocationIOApi(req, res, next) {
	// request untuk mencari info ip address

	// ambil ip yang akan di cari
	const ipFind = req.body.item;

	// cek ip
	if(!ipFind) {
		// empty ip
		res.status(422).json({
			type: false,
			error: 'Ip Address Required'
		});
	} else {
		try {
			// request to ipgeolocation.io to find ip
			console.log(`Find ip address ${ipFind}`);
			const resultFindIpgeolocationIoToIp = await getRequestIpGeolocationIoIp(String(ipFind));
			
			console.log(resultFindIpgeolocationIoToIp.body);
			if(resultFindIpgeolocationIoToIp.body.ip !== undefined) {
				// valid response
				res.status(200).json({
					type: true,
					data: resultFindIpgeolocationIoToIp.body
				});
			} else {
				// invalid response
				res.status(200).json({
					type: false,
					error: resultFindIpgeolocationIoToIp.body.message
				});
			}
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	}
}

async function getPhonenumberInfoAntideoApi(req, res, next) {
	// ambil phonenumber yang akan di cari
	const phonenumberFind = req.body.item;

	// cek phonenumber
	// const regexToNumber = /^[0-9]*$/;
	if(!phonenumberFind) {
		// invalid phonenumber
		res.status(422).json({
			type: false,
			error: 'PhoneNumber Required'
		})
	} else {
		try {
			// valid phonenumber
			console.log(`Find PhoneNumber ${String(phonenumberFind)}`);
			const resultFindPhoneNumberInfoAntiDeo = await getRequestPhoneNumberInfoAntiDeo(String(phonenumberFind))

			console.log(resultFindPhoneNumberInfoAntiDeo.body);
			if(resultFindPhoneNumberInfoAntiDeo.body.valid === true) {
				// valid response 
				res.status(200).json({
					type: true, 
					data: resultFindPhoneNumberInfoAntiDeo.body
				})
			} else {
				// invalid response
				res.status(200).json({
					type: false,
					error: `${phonenumberFind} invalid phonenumber`
				});
			}
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	} 
}

async function getEmailInfoAntideoApi(req, res, next) {

	// ambil email yang akan dicari
	const emailFind = String(req.body.item);

	// cek email
	if(!emailFind) {
		// invalid email
		res.status(422).json({
			type: false,
			error: 'Email Required'
		});
	} else {
		// valid email
		try {
			console.log(`Find email info ${emailFind}`);
			const resultFindEmailInfoAntiDeo = await getRequestEmailInfoAntideoApi(emailFind);
		
			console.log(resultFindEmailInfoAntiDeo.body);
			if(resultFindEmailInfoAntiDeo.body.error === undefined) {
				// valid response from antideo api
				res.status(200).json({
					type: true,
					data: resultFindEmailInfoAntiDeo.body
				})
			} else {
				// invalid response from antideo api
				res.status(200).json({
					type: false,
					error: resultFindEmailInfoAntiDeo.body.error.message
				});
			}
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	}
}

async function portScanning(req, res, next) {
	// ambil host yang akan di scan port nya
	const host = String(req.body.item);

	// cek host
	if(!host) {
		// invalid host
		res.status(422).json({
			type: false,
			error: 'Host Required'
		});
	} else {
		// host required
		try {
			console.log(`Scanning port in ${host} ...`);;
			const resultPortScanningEthicalHackerIndonesia = await getRequestPortScanningEthicalHackerIndonesia(host);
			// karena ini scraaping jadi kita harus ambil data2 dari hasil scanning port secara teratur/terurut/detail kita harus filter menggunakan fungsi FilterPortScanningEthicalHackerIndonesia
			const resultFilterPortScanningEthicalHackerIndonesia = await filterPortScanningEthicalHackerIndonesia(resultPortScanningEthicalHackerIndonesia.body);
			console.log(resultFilterPortScanningEthicalHackerIndonesia);
			
			// cek response
			if(resultFilterPortScanningEthicalHackerIndonesia.type === true) {
				// data response valid
				res.status(200).json({
					type: true, 
					data: resultFilterPortScanningEthicalHackerIndonesia.msg
				});
			}  else {
				// data response invalid
				res.status(200).json({
					type: false, 
					error: resultFilterPortScanningEthicalHackerIndonesia.msg
				});
			}
 		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	}
}

async function subdomainFinder(req, res, next) {
	// ambil domain yang akan di cari subdomain nya
	const domain = String(req.body.item);

	// cek domain
	if(!domain) {
		// domain is empty
		res.status(422).json({
			type: false,
			error: 'Domain Required'
		});
	} else {
		// domain required
		try {
			console.log(`Find subdomain on ${domain}...`);
 			const resultFindSubdomainEthicalHackerIndonesia = await findSubdomainEthicalHackerIndonesia(domain);			
			// karena ini scraaping jadi kita harus ambil data2 dari hasil find subdomain secara teratur/terurut/detail kita harus filter menggunakan fungsi FilterSubdomainFinderEthicalHackerIndonesia
			const resultFilterSubdomainFinderEthicalHackerIndonesia = await filterSubdomainFinderEthicalHackerIndonesia(resultFindSubdomainEthicalHackerIndonesia.body);
			console.log(resultFilterSubdomainFinderEthicalHackerIndonesia);

			// cek response 
			if(resultFilterSubdomainFinderEthicalHackerIndonesia.type === true) {
				// data response valid
				res.status(200).json({
					type: true,
					data: resultFilterSubdomainFinderEthicalHackerIndonesia.msg
				});
			} else {
				// data response invalid(domain wrong)
				res.status(200).json({
					type: false,
					error: resultFilterSubdomainFinderEthicalHackerIndonesia.msg
				}); 
			}
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	
	}
}

async function reverseIpLookup(req, res, next) {
	// ambil ip address
	const ipAddress = String(req.body.item);

	// cek ip address
	if(!ipAddress) {
		// ip address is empty
		res.status(422).json({
			type: false,
			error: 'Ip Address Required'
		});
	} else {
		// ip address required
		try{
			console.log(`Reverse ip lookup on ${ipAddress}...`);
			const resultReverseIpLookupEthicalHackerIndonesia = await reverseIpLookupEthicalHackerIndonesia(ipAddress);
			// karena ini scraaping jadi kita harus ambil data2 dari hasil reverse ip lookup secara teratur/terurut/detail kita harus filter menggunakan fungsi FilterSubdomainFinderEthicalHackerIndonesia
			const resultFilterReverseIpLookupEthicalHackerIndonesia = await filterReverseIpLookupEthicalHackerIndonesia(resultReverseIpLookupEthicalHackerIndonesia.body);
			console.log(resultFilterReverseIpLookupEthicalHackerIndonesia);

			// cek response
			if(resultFilterReverseIpLookupEthicalHackerIndonesia.type === true) {
				// data response valid
				res.status(200).json({
					type: true,
					data: resultFilterReverseIpLookupEthicalHackerIndonesia.msg
				})
			} else {
				// data response invalid(ip address wrong)
				res.status(200).json({
					type: false,
					error: resultFilterReverseIpLookupEthicalHackerIndonesia.msg
				});
			} 
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	}
}

async function dnsHistoryChecker(req, res, next) {
	// ambil domain
	const domain = String(req.body.item);

	// cek domain
	if(!domain) {
		// domain is empty
		res.status(422).json({
			type: false,
			error: 'Domain Required'
		});
	} else {
		// ip address required
		try{
			console.log(`DNS history checker on ${domain}...`);
			const resultDnsHistoryCheckerEthicalHackerIndonesia = await DnsHistoryCheckerEthicalHackerIndonesia(domain);
			// karena ini scraaping jadi kita harus ambil data2 dari hasil dns history checker secara teratur/terurut/detail kita harus filter menggunakan fungsi FilterSubdomainFinderEthicalHackerIndonesia
			const resultFilterDnsHistoryCheckerEthicalHackerIndonesia = await filterDnsHistoryCheckerEthicalHackerIndonesia(resultDnsHistoryCheckerEthicalHackerIndonesia.body);
			console.log(resultFilterDnsHistoryCheckerEthicalHackerIndonesia);

			// cek response
			if(resultFilterDnsHistoryCheckerEthicalHackerIndonesia.type === true) {
				// data response valid
				res.status(200).json({
					type: true,
					data: resultFilterDnsHistoryCheckerEthicalHackerIndonesia.msg
				})
			} else {
				// data response invalid(domain wrong)
				res.status(200).json({
					type: false,
					error: resultFilterDnsHistoryCheckerEthicalHackerIndonesia.msg
				});
			} 
		} catch(err) {
			// internal server error
			console.log(err);
			next(err);
		}
	}	
}


module.exports = {
	getMoviesOmbdApi,
	getIpGeolocationIOApi,
	getEmailInfoAntideoApi,
	getPhonenumberInfoAntideoApi,
	portScanning,
	subdomainFinder,
	reverseIpLookup,
	dnsHistoryChecker
};

