-- Drop Tables
DROP TABLE IF EXISTS CurrentOwner;
DROP TABLE IF EXISTS Adopters;
DROP TABLE IF EXISTS Pets;
DROP TABLE IF EXISTS Adoptions;
CREATE TABLE `CurrentOwner`(
    `current_owner_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `owner_type` VARCHAR(255) NOT NULL,
    `zipcode` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` BIGINT NOT NULL,
    `website` VARCHAR(255) NOT NULL
);
CREATE TABLE `Adopters`(
    `adopter_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `zipcode` BIGINT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` BIGINT NOT NULL,
    `quiz_result` VARCHAR(255) NOT NULL
);
CREATE TABLE `Pets`(
    `pet_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `animal_type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `weight` BIGINT NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `activity` VARCHAR(255) NOT NULL,
    `good_with` VARCHAR(255) NOT NULL,
    `neutered` BOOLEAN NOT NULL,
    `has_especial_needs` BOOLEAN NOT NULL,
    `potty_trained` BOOLEAN NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `current_owner_id` BIGINT UNSIGNED NULL,
    `adopter_id` BIGINT UNSIGNED NULL,
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`current_owner_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`adopter_id`) ON DELETE CASCADE
);
ALTER TABLE `CurrentOwner`
ADD COLUMN `pet_id` BIGINT UNSIGNED NULL,
    ADD FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE;
ALTER TABLE `Adopters`
ADD COLUMN `pet_id` BIGINT UNSIGNED NULL,
    ADD FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE;
CREATE TABLE `Adoptions`(
    `adoption_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT UNSIGNED NOT NULL,
    `adopter_id` BIGINT UNSIGNED NOT NULL,
    `current_owner_id` BIGINT UNSIGNED NOT NULL,
    `adoption_date` DATE NOT NULL,
    `adoption_status` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`current_owner_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`adopter_id`) ON DELETE CASCADE,
    FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE
);