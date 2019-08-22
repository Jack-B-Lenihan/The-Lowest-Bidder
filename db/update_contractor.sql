/* handles contractors updating their profile info */
UPDATE contractor
SET $1 = $2
WHERE contractor_id = $3;
SELECT * from contractor
WHERE contractor_id = $3;