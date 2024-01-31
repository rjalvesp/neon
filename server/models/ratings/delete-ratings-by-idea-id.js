const { ValidateUUID } = require('../../common/validators/id');
const { mainDb } = require('../../services/databases');

const deleteRatingsByIdeaId = async (idIdea, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    await sql.beginTransaction();

    ValidateUUID(idIdea);

    const deleteRatingsQuery = `
      DELETE FROM ratings
      WHERE idIdea = ?;
    `;
    const deleteRatingsValues = [idIdea];

    await sql.execute(deleteRatingsQuery, deleteRatingsValues);

    return;
  } catch (e) {
    console.error(`Error deletingRatingsByIdeaId ${e}`);
    throw new Error(`Error deletingRatingsByIdeaId ${e}`);
  }
};

module.exports = deleteRatingsByIdeaId;
