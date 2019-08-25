const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/re-api', require('./app'));

// midleware 404
router.use(function(req, res, next) {
	console.log('404 page not found')
  	res.status(404).render('404');
});

// 500 - Any server error
router.use(function(err, req, res, next) {
	console.log(err);
 	res.status(500).send('Internal Server Error');
});
module.exports = router;