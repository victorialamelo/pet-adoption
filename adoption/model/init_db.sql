-- Drop existing tables if they exist
DROP TABLE IF EXISTS `CurrentOwner`,
`Adopters`,
`Pets`,
`Adoptions`;
-- Create new tables
CREATE TABLE `Users`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255) NOT NULL,
    `zipcode` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    -- Changed to VARCHAR to accommodate phone formatting
    `entity_name` BIGINT NOT NULL,
    `entity_website` VARCHAR(255) NOT NULL,
    `entity_registration_id` BIGINT NOT NULL,
    `quiz_result` VARCHAR(255) NOT NULL
);
CREATE TABLE `Pets`(
    `pet_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `animal_type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `weight` BIGINT NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `activity_level` VARCHAR(255) NOT NULL,
    `good_with` VARCHAR(255) NOT NULL,
    `neutered` BOOLEAN NOT NULL,
    `has_especial_needs` BOOLEAN NOT NULL,
    `potty_trained` BOOLEAN NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `pet_description` VARCHAR(255) NOT NULL,
    `owner_id` BIGINT NOT NULL
);
CREATE TABLE `Requests`(
    `request_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT NOT NULL,
    `requester_id` BIGINT NOT NULL,
    `request_date` DATE NOT NULL,
    `request_status` VARCHAR(255) NOT NULL,
    `request_message` VARCHAR(255) NOT NULL
);
CREATE TABLE `Posts`(
    `post_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT NOT NULL,
    `post_owner_id` BIGINT NOT NULL,
    `post_date` DATETIME NOT NULL -- Changed to DATETIME for proper date/time format
);
-- Adding foreign key constraints
ALTER TABLE `Posts`
ADD CONSTRAINT `posts_post_owner_id_foreign` FOREIGN KEY (`post_owner_id`) REFERENCES `Pets` (`owner_id`);
ALTER TABLE `Posts`
ADD CONSTRAINT `posts_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `Pets` (`pet_id`);
ALTER TABLE `Requests`
ADD CONSTRAINT `requests_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `Pets` (`pet_id`);
ALTER TABLE `Pets`
ADD CONSTRAINT `pets_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `Users` (`user_id`);
ALTER TABLE `Requests`
ADD CONSTRAINT `requests_requester_id_foreign` FOREIGN KEY (`requester_id`) REFERENCES `Users` (`user_id`);