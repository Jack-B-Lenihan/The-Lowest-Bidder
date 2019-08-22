/* file handles bcrypt register method in the contractor controller */
INSERT INTO contractor (contractor_email, password)
VALUES ($1, $2)
returning *;