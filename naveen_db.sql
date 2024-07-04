-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2024 at 08:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naveen_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `title` varchar(55) NOT NULL,
  `price` int(55) NOT NULL,
  `description` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `createdon` datetime NOT NULL,
  `quantity` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `price`, `description`, `img`, `createdon`, `quantity`, `rating`) VALUES
('1c8489ab-9683-4b06-a44f-98137b292b03', 'Airpods', 16200, 'good', '1720069984356-airpods-pro-2.png', '2024-07-04 10:43:04', 1, 4),
('4df2a559-5056-48a3-8d64-d2870882ccea', 'Macbook', 120000, 'Nice!', '1720070349086-s-l1600.jpg', '2024-07-04 10:49:09', 1, 4),
('676818fa-33c5-430d-b57d-886a900c3697', 'Phone', 10000, 'Awesome!', '1720070050804-pexels-lastly-699122.jpg', '2024-07-04 10:44:11', 1, 5),
('804e45e0-2b16-46d0-84fe-2f96f7d52821', 'watch', 32000, 'Nice!', '1720070142176-u7_1.jpg', '2024-07-04 10:45:42', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(55) NOT NULL,
  `username` varchar(55) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(15) NOT NULL,
  `createdon` date NOT NULL,
  `userType` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `email`, `phoneNumber`, `createdon`, `userType`) VALUES
('a58b4f22-195e-474c-a0e7-645157d7a115', 'Testing', '$2b$10$X9rP4HWUqhCIuNWIWNqfcOTzhZLTW51crw8QqbEXvKtQQaob.MhYa', 'test@gmail.com', '7899555554', '2024-07-04', 'admin'),
('d3535424-a2ba-4652-ad93-3c5ea70100e3', 'testing2233', '$2b$10$agqvY6J5662Wfavi9ZV8z.c7vQ8oxLGtKnJ6of9CCJsOWQQIATuam', 'user@gmail.com', '78945612345', '2024-07-03', 'SuperAdmin'),
('dc2332b3-6c81-41e7-944d-05be7214f240', 'Naveen Singh77', '$2b$10$0b9ioxWbmcKLCMorXjLNHu.cN6XJtNMvHQ6MwGFTa0HIPQnCDGKeu', 'naveena@gmail.com', '789456134', '2024-07-02', 'SuperAdmin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD UNIQUE KEY `productId` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
