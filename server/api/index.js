const express = require('express');
const router = express.Router({ strict: true });

router.use('/v1', require('./v1'));

module.exports = router;
