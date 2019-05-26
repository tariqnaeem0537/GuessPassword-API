var router = require('express').Router();

router.use('/', require('../routes/api/password'));

module.exports = router;
