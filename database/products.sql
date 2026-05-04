-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 04, 2026 at 12:55 PM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `stock`, `image`, `created_at`) VALUES
(1, 'น้ำดื่มสิงห์ 600ml', 'เครื่องดื่ม', 12.00, 100, '1777895062322-476690028.webp', '2026-05-04 11:28:59'),
(2, 'ข้าวหอมมะลิ 5kg', 'ข้าวสาร', 180.00, 50, '1777895055205-53423946.jpg', '2026-05-04 11:28:59'),
(3, 'นมโฟร์โมสต์ 1L', 'นมและผลิตภัณฑ์', 52.00, 30, '1777895047786-690762338.webp', '2026-05-04 11:28:59'),
(4, 'ขนมปังแซนวิช', 'เบเกอรี่', 35.00, 0, '1777895029158-216919475.jpg', '2026-05-04 11:28:59'),
(5, 'ทูน่ากระป๋อง', 'อาหารกระป๋อง', 25.00, 80, '1777895021322-993272704.jpg', '2026-05-04 11:28:59'),
(6, 'สบู่ลักส์', 'ของใช้', 45.00, 60, '1777895006637-720125246.jpg', '2026-05-04 11:28:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
