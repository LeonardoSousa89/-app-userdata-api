/*https://www.codegrepper.com/code-examples/whatever/knex.first*/

CREATE DATABASE edata;
DROP   DATABASE edata;

\c edata

CREATE TABLE IF NOT EXISTS edatauser(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass VARCHAR(250)
);
ALTER TABLE edatauser ADD COLUMN adm VARCHAR(100);
ALTER TABLE edatauser DROP COLUMN adm;

DROP TABLE edatauser;

SELECT * FROM edatauser;

CREATE TABLE IF NOT EXISTS edatauserinformation(
    id SERIAL PRIMARY KEY,
    userimg VARCHAR(250),
    userdesc VARCHAR(250),
    id_information INT, 
    FOREIGN KEY(id_information) REFERENCES edatauser(id_user)
);
DROP TABLE edatauserinformation;

SELECT * FROM edatauserinformation;

/*EXAMPLE CODE USE WHEN IT'S NEED*/
DELETE FROM edatauserinformation WHERE id = '<id_passed_this_field>';
DELETE FROM edatauserinformation;

DELETE FROM edatauser;

/*EXAMPLE CODE USE WHEN IT'S NEED*/
UPDATE edatauserinformation SET userdesc id = '<new_desc>' WHERE userdesc = '<old_desc>';


INSERT INTO edatauser VALUES(1,'Leonardo Sousa','mendesdev@aws.com','1234');

INSERT INTO edatauserinformation VALUES(1,'https://pixabay.com/photos/chess-queen-black-queen-knight-6872239/','developer engineer',1);
INSERT INTO edatauserinformation VALUES(2,'https://pixabay.com/illustrations/matrix-code-computer-pc-data-356024/','',1);
INSERT INTO edatauserinformation VALUES(3,'','i am manager of supply chain to!',1);

SELECT u.id_user, u.username, u.email, i.userimg, i.userdesc
FROM  edatauser u 
INNER JOIN edatauserinformation i
ON id_user = id_information;


