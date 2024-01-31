const { ValidateUUID } = require('../../common/validators/id');
const { ValidateIdeaBody } = require('../../common/validators/ideas');
const { mainDb } = require('../../services/databases');
const { deleteAssigneesByIdeaId, createAssignees } = require('../assignees');

const updateIdea = async (ideaId, body, _sql) => {
  const sql = _sql || mainDb.getMainConnection();
  const { assignees = [], ...idea } = body;
  try {
    await sql.beginTransaction();

    ValidateUUID(ideaId);
    ValidateIdeaBody(body);

    const updateIdeaQuery = `
      UPDATE ideas 
      SET 
        postedBy = ?,
        summary = ?,
        workflow = ?
      WHERE id = ?;
    `;
    const updateIdeaValues = [
      idea.postedBy,
      idea.summary,
      idea.workflow,
      ideaId,
    ];

    await sql.execute(updateIdeaQuery, updateIdeaValues);

    await deleteAssigneesByIdeaId(ideaId, sql);

    const assigneeValues = assignees.map((name) => ({ idIdea: ideaId, name }));

    await createAssignees(assigneeValues, sql);

    await sql.commit();

    return ideaId;
  } catch (e) {
    await sql.rollback();
    console.error(`Error updatingIdea ${e}`);
    throw new Error(`Error updatingIdea ${e}`);
  }
};

module.exports = updateIdea;
