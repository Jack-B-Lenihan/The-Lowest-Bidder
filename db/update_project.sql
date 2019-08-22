/* handles clients updating projects on their profile */
UPDATE "Projects"
SET $1 = $2
WHERE project_id = $3;