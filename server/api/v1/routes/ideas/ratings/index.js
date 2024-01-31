const { StatusCodes } = require('http-status-codes');
const express = require('express');
const isRatingValid = require('../../../middlewares/validation/body/validate-rating');
const {
  createIdeaRatingController,
} = require('../../../controllers/ideas/ratings');

const router = express.Router({ strict: true, mergeParams: true });

router.post('/', isRatingValid, async (req, res, next) => {
  try {
    await createIdeaRatingController(req.params, req.body);
    res.status(StatusCodes.CREATED).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
