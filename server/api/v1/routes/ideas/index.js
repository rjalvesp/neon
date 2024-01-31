const { StatusCodes } = require('http-status-codes');
const express = require('express');
const {
  getIdeasController,
  getIdeaByIdController,
  updateIdeaByIdController,
  createIdeaController,
  deleteIdeaByIdController,
} = require('../../controllers/ideas');
const isPageValid = require('../../middlewares/validation/query/validate-page');
const isUUIDValid = require('../../middlewares/validation/params/validate-id');
const isIdeaValid = require('../../middlewares/validation/body/validate-idea');

const router = express.Router({ strict: true });

router.get('/', isPageValid, async (req, res, next) => {
  try {
    const result = await getIdeasController(req.query);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', isUUIDValid, async (req, res, next) => {
  try {
    const result = await getIdeaByIdController(req.params);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
});
router.put('/:id', isIdeaValid, async (req, res, next) => {
  try {
    await updateIdeaByIdController(req.params, req.body);
    res.status(StatusCodes.CREATED).json({ ok: true });
  } catch (error) {
    next(error);
  }
});
router.post('/', isIdeaValid, async (req, res, next) => {
  try {
    const id = await createIdeaController(req.body);
    res.status(StatusCodes.CREATED).json({ ok: true, id });
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', isUUIDValid, async (req, res, next) => {
  try {
    await deleteIdeaByIdController(req.params);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
});

router.use('/:id/ratings', isUUIDValid, require('./ratings'));

module.exports = router;
