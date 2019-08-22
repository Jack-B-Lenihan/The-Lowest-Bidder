/* returns all the projects posted by a specific client */
SELECT * FROM "Projects"
WHERE client_id = $1;
