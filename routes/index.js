const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/app', require('./app'));

module.exports = router;