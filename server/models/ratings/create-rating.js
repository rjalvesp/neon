const { v4: uuid } = require('uuid');
const { mainDb } = require('../../services/databases');
const { ValidateRatingBody } = require('../../common/validators/ratings');

const createRating = async (body, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    ValidateRatingBody(body);

    const id = uuid();

    const createRatingsQuery = `
      INSERT INTO ratings (id, idIdea, score)
      VALUES (?, ?, ?);
    `;

    const createRatingsValues = [id, body.idIdea, body.score];

    await sql.execute(createRatingsQuery, createRatingsValues);

    return;
  } catch (e) {
    console.error(`Error creatingRating ${e}`);
    throw new Error(`Error creatingRating ${e}`);
  }
};

module.exports = createRating;
