-- Create CurrentOwner Table
CREATE TABLE `CurrentOwner`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `user_type` ENUM('currentowner', 'adopter') NOT NULL,
    `owner_type` VARCHAR(255) NOT NULL,
    `zipcode` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `phone` BIGINT NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Adopters Table
CREATE TABLE `Adopters`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `user_type` ENUM('currentowner', 'adopter') NOT NULL,
    `zipcode` BIGINT NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `quiz_result` VARCHAR(255) NOT NULL,
    `phone` BIGINT NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Pets Table
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
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`user_id`) ON DELETE CASCADE
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
    FOREIGN KEY (`current_owner_id`) REFERENCES `CurrentOwner`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`adopter_id`) REFERENCES `Adopters`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE
);