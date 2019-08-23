const request = require('request');
const apikey = require('../../config/apikey');
const omdbapiUrl = `http://www.omdbapi.com/?apikey=${apikey.OMDBAPI}`;
 
const getRequestOMDBAPIBySeacrchMovieName = (movieSearch) => (new Promise((resolve, reject) => {
	// fungsi untuk melakukan requst GET ke OMDBAPI untk mendapatkan daftar movie berdarkan nama movie
 	request.get(`${omdbapiUrl}&s=${movieSearch}`, (err, httpResponse, body) => {
		if(err) {
			console.log('error');
			reject(err);
		}
		else resolve({httpResponse: httpResponse, body: JSON.parse(body)});
 	});
}));

const getRequestOMDBAPIBySeacrchMovieId = (movieId) => (new Promise((resolve, reject) => {
	// fungsi untk melakukan request GET ke OMDBAPI untuk mendapatkan datail dari movie tertentu berdarkan ID movie
 	request.get(`${omdbapiUrl}&i=${movieId}`, (err, httpResponse, body) => {
		if(err) reject(err);
		resolve({httpResponse: httpResponse, body: JSON.parse(body)});
	});
}));

async function getOMDBAPIMovies(req, res, next) {
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
				console.log(err);
				res.json({
					type: false,
					error: err
				});
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
				res.json({
					type: false,
					error: err
				});
			}
		}
	}
}

module.exports = {
	getOMDBAPIMovies
};
