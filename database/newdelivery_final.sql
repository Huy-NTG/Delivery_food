-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2025 at 10:12 AM
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
-- Database: `newdelivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `phone`) VALUES
(1, 'huygia', '0377281885');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `status` enum('pending','paid','shipped','processing') NOT NULL DEFAULT 'pending',
  `paymentMethod` enum('cod','bank_transfer','momo','vnpay') NOT NULL DEFAULT 'cod',
  `total` decimal(10,0) NOT NULL,
  `customerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `createdAt`, `status`, `paymentMethod`, `total`, `customerId`) VALUES
(1, '2025-05-22 23:54:23.714168', 'shipped', 'cod', 300000, 1),
(2, '2025-05-23 00:17:25.544367', 'shipped', 'cod', 600000, 1),
(3, '2025-05-23 00:26:34.057238', 'pending', 'cod', 400000, 1),
(4, '2025-05-23 00:27:12.681876', 'pending', 'cod', 600000, 1),
(5, '2025-05-23 00:27:58.062598', 'pending', 'cod', 600000, 1),
(6, '2025-05-23 14:38:12.950116', 'pending', 'cod', 400000, 1),
(7, '2025-05-24 15:09:29.384279', 'shipped', 'cod', 1000000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `orderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_item`
--

INSERT INTO `order_item` (`id`, `productId`, `quantity`, `price`, `orderId`) VALUES
(1, 1, 1, 300000, 1),
(2, 1, 2, 300000, 2),
(3, 3, 1, 100000, 3),
(4, 4, 1, 400000, 3),
(5, 1, 1, 300000, 4),
(6, 2, 1, 900000, 4),
(7, 4, 1, 400000, 4),
(8, 4, 1, 400000, 5),
(9, 3, 1, 100000, 5),
(10, 2, 1, 900000, 5),
(11, 1, 1, 300000, 5),
(12, 5, 1, 600000, 6),
(13, 4, 1, 400000, 6),
(14, 5, 1, 600000, 7),
(15, 4, 1, 400000, 7);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `image`, `category`, `quantity`) VALUES
(1, 'tôm ', NULL, 300000.00, 'berger.jpg', 'Món chính', 95),
(2, 'gà', NULL, 900000.00, 'com.jpg', 'Món chính', 98),
(3, 'cá', NULL, 100000.00, 'com_tam.jpg', 'Món chính', 98),
(4, 'bò', NULL, 400000.00, 'sushi.jpg', 'Món chính', 95),
(5, 'mì ý', NULL, 600000.00, '1747985712987-76303097.jpg', 'Món chính', 98),
(6, 'hủ tiếu', NULL, 30000.00, '1747985751039-963266662.jpg', 'Món chính', 100);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `lastLogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`, `sdt`, `role`, `status`, `lastLogin`) VALUES
(1, 'johndoe2@gmail.com', 'huygia', '$2b$10$rZAoENipzgLfN4Ce8T1E2.TrCG5hlnCwr5C0K/y37RpTB8XgekjLu', '0377281885', 'user', 'active', NULL),
(2, 'johndoe1@gmail.com', 'huyle', '$2b$10$6GlmFdCtZT2NSN2nFu0DGOumGvPna111HnheHEPDmh9xSD8yJK/Me', '12345678912', 'admin', 'active', NULL),
(4, 'khoa123456@gmail.com', 'khoa', '$2b$10$x3xD4wMPaxM/m7tFZxghIufBtS5To9dbBzF4qu71GzuSljnBlcFH6', NULL, 'user', 'active', '2025-05-22 23:56:25'),
(6, 'dffgfdg@gmail.com', 'khanh', '$2b$10$NBn9.R4N32c3BOCCIfxkN.NqoVu/H9p6I/fdMu2KQPDbkKQyCH6R.', NULL, 'user', 'active', '2025-05-22 23:58:29'),
(7, 'giahuy120304@gmail.com', 'thai', '$2b$10$MM3xwnZ3lvD3A34HrEcRQOT4BYtE9mJDKxryYMaG9ZVhOvxtZ1sNC', NULL, 'admin', 'active', '2025-05-23 13:17:34'),
(8, 'tho@gmail.com', 'tho', '$2b$10$wwxoTf/6F6uJybWjZ.fD3.9NFVF6Nue9YllBGmChKwePhz47P6Iu.', '', 'user', 'active', '2025-05-23 13:39:32'),
(9, 'phanthoai@gmail.com', 'thoaiphan', '$2b$10$NS/WC1WKpkVcaGv.P2ajUO.oSIyKWekG.znzrtyaqGMryIb8THLuC', '', 'user', 'active', '2025-05-11 13:41:20'),
(10, 'phan123@gmail.com', 'phan', '$2b$10$lRP5ManVXn4t1NDgX1N8ter3uuhqI49h0tIRCru9vCTbAt5BrkyRK', '0123456789', 'user', 'active', '2025-05-23 13:45:29'),
(11, 'khanh@gmail.com', 'hahah', '$2b$10$yRiBFCXOQkkOm1V0pl7PFOlYEwHsd8v9HoUghiZdj7JArhr19EUZe', '', 'user', 'active', '2025-05-23 13:48:33'),
(12, 'lehoahoa123@gmail.com', 'HPA', '$2b$10$CjnCLOgB1NA/2IPfXxBOu.pC3cY1e4oUTuBQHhrdeMZcIiNIJ0E6C', NULL, 'user', 'active', NULL),
(13, 'thanhnhan@gmail.com', 'phanthanhf', '$2b$10$THcmf67MEdWrOejXOsRFxeWmJAxa/6UQFTcsTvEch1cICUmuY1XPu', '', 'user', 'active', '2025-05-23 14:23:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_03846b4bae9df80f19c76005a8` (`phone`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_124456e637cca7a415897dce659` (`customerId`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_646bf9ece6f45dbe41c203e06e0` (`orderId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_124456e637cca7a415897dce659` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `FK_646bf9ece6f45dbe41c203e06e0` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
