-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 12, 2018 at 01:51 AM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams-backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `ClientID` varchar(40) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `ClientID`, `name`) VALUES
(1, '2a3905330ca2fe861bcd43290de2ea79', '');

-- --------------------------------------------------------

--
-- Table structure for table `iterations`
--

CREATE TABLE `iterations` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `iteration_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `iterations`
--

INSERT INTO `iterations` (`id`, `test_id`, `iteration_number`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `metrics`
--

CREATE TABLE `metrics` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `metrics`
--

INSERT INTO `metrics` (`id`, `name`) VALUES
(1, 'Playback Delay'),
(2, 'Dropped Frame'),
(3, 'Manifest Loading Delay'),
(4, 'Stream Initialization Delay'),
(5, 'Quality Change Delay'),
(6, 'Playback Seeking Delay'),
(7, 'Buffer Stable Time'),
(8, 'Buffer Level'),
(9, 'Playback Rate');

-- --------------------------------------------------------

--
-- Table structure for table `metric_values`
--

CREATE TABLE `metric_values` (
  `id` int(11) NOT NULL,
  `metric_id` int(11) NOT NULL,
  `iteration_id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `metric_values` decimal(10,2) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `metric_values`
--

INSERT INTO `metric_values` (`id`, `metric_id`, `iteration_id`, `test_id`, `unit_id`, `metric_values`, `created`) VALUES
(1, 3, 1, 1, 1, '870.00', '2018-02-10 22:10:33'),
(2, 4, 1, 1, 1, '70.00', '2018-02-10 22:10:33'),
(3, 1, 1, 1, 1, '1.00', '2018-02-10 22:12:21'),
(4, 5, 1, 1, 1, '33.00', '2018-02-10 22:12:21'),
(20, 6, 1, 1, 1, '54.00', '2018-02-10 22:20:49'),
(21, 9, 1, 1, 1, '1.00', '2018-02-10 22:20:49'),
(22, 7, 1, 1, 1, '12.00', '2018-02-10 22:20:49'),
(23, 2, 1, 1, 1, '5.00', '2018-02-10 22:20:49'),
(24, 8, 1, 1, 1, '7.00', '2018-02-10 22:59:19'),
(25, 8, 1, 1, 1, '4.00', '2018-02-10 22:59:19'),
(26, 3, 2, 1, 1, '800.00', '2018-02-11 00:43:11'),
(27, 1, 2, 1, 1, '5.00', '2018-02-11 22:56:57'),
(28, 2, 2, 1, 1, '3.00', '2018-02-12 00:09:53'),
(29, 4, 2, 1, 1, '50.00', '2018-02-12 00:12:45'),
(30, 5, 2, 1, 1, '40.00', '2018-02-12 00:31:15'),
(31, 6, 2, 1, 1, '44.00', '2018-02-12 00:44:11'),
(32, 7, 2, 1, 1, '12.00', '2018-02-12 01:06:58'),
(33, 9, 2, 1, 1, '1.00', '2018-02-12 01:19:27'),
(34, 8, 2, 1, 1, '1.00', '2018-02-12 01:34:01'),
(35, 8, 2, 1, 1, '2.00', '2018-02-12 01:34:18');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `version` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `version`) VALUES
(1, 'dash Player', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `client_id`, `player_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`) VALUES
(1, 'seconds'),
(2, 'KB'),
(3, 'No Unit');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ClientID` (`ClientID`);

--
-- Indexes for table `iterations`
--
ALTER TABLE `iterations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metrics`
--
ALTER TABLE `metrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metric_values`
--
ALTER TABLE `metric_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `iterations`
--
ALTER TABLE `iterations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `metrics`
--
ALTER TABLE `metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `metric_values`
--
ALTER TABLE `metric_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
