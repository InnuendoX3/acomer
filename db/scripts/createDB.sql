-- CREATE DATABASE acomer;

-- USE acomer;

-- CREATE TABLE restaurants (
	restaurantID INT(5) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    address VARCHAR(45) DEFAULT NULL,
    rating INT DEFAULT NULL,
    PRIMARY KEY(restaurantID)
);

CREATE TABLE genres (
genreID INT NOT NULL AUTO_INCREMENT,
genre VARCHAR(45) DEFAULT NULL,
PRIMARY KEY(genreID)
);
CREATE TABLE cities (
cityID INT NOT NULL AUTO_INCREMENT,
city VARCHAR(45) DEFAULT NULL,
PRIMARY KEY(cityID)
);
CREATE TABLE comments (
commentID INT NOT NULL AUTO_INCREMENT,
comment TEXT DEFAULT NULL,
PRIMARY KEY(commentID),
FOREIGN KEY(commentID) REFERENCES restaurants(restaurantID)
);

-- INSERT INTO restaurants values
(1, 'El Colombiano', 'Colombiagatan 54', 4),
(2, 'El Sueco', 'Suecogatan 30', 4),
(3, 'El Peruano', 'Peruanogatan 12', 3);

SELECT * FROM restaurants;
