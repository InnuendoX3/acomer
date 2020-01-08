-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema acomer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema acomer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `acomer` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `acomer` ;

-- -----------------------------------------------------
-- Table `acomer`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`cities` (
  `cityID` INT(11) NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`cityID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acomer`.`restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`restaurants` (
  `restaurantID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `rating` INT(2) NULL DEFAULT NULL,
  PRIMARY KEY (`restaurantID`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acomer`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`comments` (
  `commentID` INT(11) NOT NULL AUTO_INCREMENT,
  `comment` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`commentID`)
    REFERENCES `acomer`.`restaurants` (`restaurantID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acomer`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`genres` (
  `genreID` INT(11) NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`genreID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acomer`.`genres_restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`genres_restaurants` (
  `genreID` INT(11) NOT NULL,
  `restaurantID` INT(5) NOT NULL,
  PRIMARY KEY (`genreID`, `restaurantID`),
  INDEX `fk_genres_has_restaurants_restaurants1_idx` (`restaurantID` ASC) VISIBLE,
  INDEX `fk_genres_has_restaurants_genres1_idx` (`genreID` ASC) VISIBLE,
  CONSTRAINT `fk_genres_has_restaurants_genres1`
    FOREIGN KEY (`genreID`)
    REFERENCES `acomer`.`genres` (`genreID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_genres_has_restaurants_restaurants1`
    FOREIGN KEY (`restaurantID`)
    REFERENCES `acomer`.`restaurants` (`restaurantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `acomer`.`cities_restaurants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `acomer`.`cities_restaurants` (
  `cityID` INT(11) NOT NULL,
  `restaurantID` INT(5) NOT NULL,
  PRIMARY KEY (`cityID`, `restaurantID`),
  INDEX `fk_cities_has_restaurants_restaurants1_idx` (`restaurantID` ASC) VISIBLE,
  INDEX `fk_cities_has_restaurants_cities1_idx` (`cityID` ASC) VISIBLE,
  CONSTRAINT `fk_cities_has_restaurants_cities1`
    FOREIGN KEY (`cityID`)
    REFERENCES `acomer`.`cities` (`cityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cities_has_restaurants_restaurants1`
    FOREIGN KEY (`restaurantID`)
    REFERENCES `acomer`.`restaurants` (`restaurantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
