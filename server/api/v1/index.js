const express = require('express');
const router = express.Router({ strict: true });

router.use('/ideas', require('./routes/ideas'));

module.exports = router;
