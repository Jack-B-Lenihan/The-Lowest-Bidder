/* retrieves contractor to pass to profile component when a contractor logs in */

SELECT * FROM contractor
WHERE contractor_email = $1;
