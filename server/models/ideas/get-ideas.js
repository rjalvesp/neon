const { ValidatePageBody } = require('../../common/validators/page');
const { mainDb } = require('../../services/databases');

const getIdeas = async (offset = 0, limit = 0, _sql) => {
  const sql = _sql || mainDb.getMainConnection();

  try {
    ValidatePageBody({ offset, limit });

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
      ORDER BY ideas.createdAt DESC
      LIMIT ?
      OFFSET ?;
    `;

    const getIdeaValues = [limit.toString(), offset.toString()];
    const [rows] = await sql.execute(getIdeaQuery, getIdeaValues);
    return rows;
  } catch (e) {
    console.error(`Error getIdeas ${e}`);
    throw new Error(`Error getIdeas ${e}`);
  }
};

module.exports = getIdeas;
