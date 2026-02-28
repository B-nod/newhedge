-- SQL Script to Create Testimonials Table
-- Run this in cPanel phpMyAdmin if TypeORM synchronize doesn't work

-- Create testimonials table
CREATE TABLE IF NOT EXISTS `testimonial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create index on approved column for faster queries
CREATE INDEX `IDX_APPROVED` ON `testimonial` (`approved`);

-- Create index on createdAt for sorting
CREATE INDEX `IDX_CREATED_AT` ON `testimonial` (`createdAt`);
