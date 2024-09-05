USE home_db;
-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(100) UNIQUE NOT NULL,
    `email` varchar(100) UNIQUE NOT NULL
);

-- Create the home table
CREATE TABLE IF NOT EXISTS `home` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `street_address` varchar(255) UNIQUE NOT NULL,
    `state` varchar(50) NOT NULL,
    `zip` varchar(10) NOT NULL,
    `sqft` float NOT NULL,
    `beds` int NOT NULL,
    `baths` int NOT NULL,
    `list_price` float NOT NULL
);

-- Create the user_home_interest table to represent the many-to-many relationship
CREATE TABLE IF NOT EXISTS `user_home_interest` (
    `user_id` INT,
    `home_id` INT,
    PRIMARY KEY (`user_id`, `home_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE CASCADE
);

-- Populate the user table
INSERT IGNORE INTO `user` (username, email)
SELECT DISTINCT username, email
FROM user_home
WHERE username IS NOT NULL AND email IS NOT NULL;

-- Populate the home table
INSERT IGNORE INTO `home` (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home
WHERE street_address IS NOT NULL;

-- Populate the user_home_interest table
INSERT INTO `user_home_interest` (user_id, home_id)
SELECT DISTINCT u.id, h.id
FROM user_home uh
JOIN `user` u ON uh.username = u.username
JOIN `home` h ON uh.street_address = h.street_address;
