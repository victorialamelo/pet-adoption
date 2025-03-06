--
-- Create Tables
--
CREATE TABLE `CurrentOwner`(
    `current_owner_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `owner_type` VARCHAR(255) NOT NULL,
    `zipcode` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` BIGINT NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `pet_id` BIGINT NOT NULL,
    FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE
);


CREATE TABLE `Pets`(
    `pet_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `animal_type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `breed` VARCHAR(255) NULL,
    `weight` BIGINT NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `activity` VARCHAR(255) NOT NULL,
    `good_with` VARCHAR(255) NOT NULL,
    `neutured` BOOLEAN NOT NULL,
    `has_especial_needs` BOOLEAN NOT NULL,
    `potty_trained` BOOLEAN NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `current_owner_id` BIGINT NOT NULL,
    `adopter_id` BIGINT NOT NULL,
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`current_owner_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`adopter_id`) ON DELETE CASCADE
);


CREATE TABLE `Adopters`(
    `adopter_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` BIGINT NULL,
    `zipcode` BIGINT NOT NULL,
    `city` BIGINT NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` BIGINT NOT NULL,
    `quiz_result` VARCHAR(255) NOT NULL,
    `pet_id` BIGINT NOT NULL,
    FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE
);


CREATE TABLE `Adoptions`(
    `adoption_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT NOT NULL,
    `adopter_id` BIGINT NOT NULL,
    `current_owner_id` VARCHAR(255) NOT NULL,
    `adoption_date` DATE NOT NULL,
    `adoption_status` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`current_owner_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`adopter_id`) ON DELETE CASCADE,
    FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE
);
