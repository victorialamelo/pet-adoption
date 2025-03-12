-- Drop existing tables if they exist
DROP TABLE IF EXISTS `Users`,
`Pets`,
`Requests`,
`Posts`;
-- Create Users table
CREATE TABLE `Users` (
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(255) NOT NULL,
    `zipcode` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `entity_name` VARCHAR(255),
    `entity_website` VARCHAR(255),
    `entity_registration_id` VARCHAR(255)
);
-- Create Pets table
CREATE TABLE `Pets` (
    `pet_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `animal_type` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `weight` BIGINT NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `activity_level` VARCHAR(255) NOT NULL,
    `good_with_cats` BOOLEAN NOT NULL,
    `good_with_dogs` BOOLEAN NOT NULL,
    `good_with_kids` BOOLEAN NOT NULL,
    `good_with_smallspaces` BOOLEAN NOT NULL,
    `neutered` BOOLEAN NOT NULL,
    `has_special_needs` BOOLEAN NOT NULL,
    `potty_trained` BOOLEAN NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `pet_description` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL
);
-- Add foreign key constraint for Pets table
ALTER TABLE `Pets`
ADD CONSTRAINT `pets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;
-- Create Requests table
CREATE TABLE `Requests` (
    `request_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT UNSIGNED NOT NULL,
    `requester_id` BIGINT UNSIGNED NOT NULL,
    `request_date` DATE NOT NULL,
    `request_status` VARCHAR(255) NOT NULL,
    `request_message` TEXT NOT NULL
);
-- Add foreign key constraints for Requests table
ALTER TABLE `Requests`
ADD CONSTRAINT `requests_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE;
ALTER TABLE `Requests`
ADD CONSTRAINT `requests_requester_id_foreign` FOREIGN KEY (`requester_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;
-- Create Posts table
CREATE TABLE `Posts` (
    `post_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pet_id` BIGINT UNSIGNED NOT NULL,
    `post_owner_id` BIGINT UNSIGNED NOT NULL,
    `post_date` DATETIME NOT NULL
);
-- Add foreign key constraints for Posts table
ALTER TABLE `Posts`
ADD CONSTRAINT `posts_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `Pets`(`pet_id`) ON DELETE CASCADE;
ALTER TABLE `Posts`
ADD CONSTRAINT `posts_post_owner_id_foreign` FOREIGN KEY (`post_owner_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE;