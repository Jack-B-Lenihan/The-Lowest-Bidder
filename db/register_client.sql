/* new client registering */

INSERT INTO client (client_email, password)
VALUES ($1, $2)
returning *;
