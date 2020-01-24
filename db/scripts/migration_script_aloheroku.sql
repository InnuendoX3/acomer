-- ----------------------------------------------------------------------------
-- Table acomer.cities
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_95a7c92138877e3`.`cities` (
  `cityID` INT(11) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`cityID`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table acomer.comments
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_95a7c92138877e3`.`comments` (
  `commentID` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` TEXT NULL DEFAULT NULL,
  `points` INT(11) NOT NULL,
  `restaurantID` INT(11) NOT NULL,
  PRIMARY KEY (`commentID`))
ENGINE = InnoDB
AUTO_INCREMENT = 42
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table acomer.genres
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_95a7c92138877e3`.`genres` (
  `genreID` INT(11) NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`genreID`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table acomer.restaurants
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_95a7c92138877e3`.`restaurants` (
  `restaurantID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `rating` DECIMAL(10,1) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`restaurantID`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table acomer.users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_95a7c92138877e3`.`users` (
  `idusers` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
