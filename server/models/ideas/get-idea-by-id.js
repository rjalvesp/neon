const { ValidateUUID } = require('../../common/validators/id');
const { mainDb } = require('../../services/databases');

const getIdeaById = async (id, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  try {
    ValidateUUID(id);

    const getIdeaQuery = `
      SELECT 
        ideas.*,
        (SELECT JSON_ARRAYAGG(score)
          FROM ratings 
          WHERE ratings.idIdea = ideas.id) AS ratings,
        (SELECT JSON_ARRAYAGG(name)
          FROM assignees 
          WHERE assignees.idIdea = ideas.id) AS assignees
      FROM ideas
      WHERE id = ?;
    `;

    const getIdeaValues = [id];

    const [rows] = await sql.execute(getIdeaQuery, getIdeaValues);
    return rows[0];
  } catch (e) {
    console.error(`Error getIdeaById ${e}`);
    throw new Error(`Error getIdeaById ${e}`);
  }
};

module.exports = getIdeaById;
