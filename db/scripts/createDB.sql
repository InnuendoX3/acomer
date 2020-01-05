CREATE DATABASE acomer;

USE acomer;

CREATE TABLE restaurants (
	id INT(5) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    address VARCHAR(45) DEFAULT NULL,
    rating INT(2) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO restaurants values
(1, 'El Colombiano', 'Colombiagatan 54', 4),
(2, 'El Sueco', 'Suecogatan 30', 4),
(3, 'El Peruano', 'Peruanogatan 12', 3);
