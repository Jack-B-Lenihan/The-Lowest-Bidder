/* handles clients deleting projects they've created */

DELETE FROM "Projects"
WHERE project_id = $1;