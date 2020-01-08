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
  `comment` TEXT NULL DEFAULT NULL,
  `restaurantID` INT(5) NOT NULL,
  INDEX `fk_comments_restaurants_idx` (`restaurantID` ASC) VISIBLE,
  CONSTRAINT `fk_comments_restaurants`
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
