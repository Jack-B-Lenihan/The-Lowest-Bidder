/* retrieves client to be emailed when a contractor places bid */

SELECT * FROM client 
WHERE client_email = $1;

/* the parameter should be the client_id foreign key on the project being bidded on */