const request = require('request');
const apikey = require('../../config/apikey');

// request url to web service api
const omdbapiUrl = `http://www.omdbapi.com/?apikey=${apikey.OmdbApi}`;
const ipGeolocationIoUrl =`https://api.ipgeolocation.io/ipgeo?apiKey=${apikey.IpGeolocationIo}`; 
const phonenumberInfoAntiDeoUrl = `https://api.antideo.com/phone/id/`; 
const emailInfoAntiDeoUrl = `https://api.antideo.com/email/`;


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
						error: resultSearchOmdbApiMovies.body.Error.code
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
			// let resultFindPhoneNumberInfoAntiDeo = {};
			// resultFindPhoneNumberInfoAntiDeo.body = {
					
			// 		    email: "genjitapaleuk@gmail.com",
			// 		    free_provider: true,
			// 		    spam: false,
			// 		    scam: false,
			// 		    disposable: false
			// 	}
		
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



module.exports = {
	getMoviesOmbdApi,
	getIpGeolocationIOApi,
	getEmailInfoAntideoApi,
	getPhonenumberInfoAntideoApi
};
