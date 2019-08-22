/* add to project table when client creates a project */
INSERT INTO "Projects" (project_name, project_type, current_image_url, desired_image_url, description, city, state, client_id, completed)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);

