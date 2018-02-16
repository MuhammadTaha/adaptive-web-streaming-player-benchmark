-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 16, 2018 at 02:45 PM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams-backend-final`
--

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `ClientID`, `name`) VALUES
(1, '25af290fa400463044b3238fa2cb29ae', '');

--
-- Dumping data for table `iterations`
--

INSERT INTO `iterations` (`id`, `test_id`, `iteration_number`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3);

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
(26, 3, 2, 1, 1, '0.00', '2018-02-11 00:43:11'),
(27, 1, 2, 1, 1, '0.00', '2018-02-11 22:56:57'),
(28, 2, 2, 1, 1, '3.00', '2018-02-12 00:09:53'),
(29, 4, 2, 1, 1, '50.00', '2018-02-12 00:12:45'),
(30, 5, 2, 1, 1, '40.00', '2018-02-12 00:31:15'),
(31, 6, 2, 1, 1, '44.00', '2018-02-12 00:44:11'),
(32, 7, 2, 1, 1, '12.00', '2018-02-12 01:06:58'),
(33, 9, 2, 1, 1, '1.00', '2018-02-12 01:19:27'),
(34, 8, 2, 1, 1, '1.00', '2018-02-12 01:34:01'),
(35, 8, 2, 1, 1, '2.00', '2018-02-12 01:34:18'),
(36, 1, 3, 1, 1, '0.00', '2018-02-13 11:35:21'),
(37, 2, 3, 1, 3, '0.00', '2018-02-13 11:35:21'),
(38, 3, 3, 1, 1, '0.00', '2018-02-13 11:35:21'),
(39, 4, 3, 1, 1, '0.00', '2018-02-13 11:35:21'),
(40, 5, 3, 1, 1, '0.00', '2018-02-13 11:35:21'),
(41, 6, 3, 1, 1, '40.00', '2018-02-13 11:35:21'),
(42, 7, 3, 1, 1, '12.00', '2018-02-13 11:35:21'),
(43, 9, 3, 1, 1, '1.00', '2018-02-13 11:35:21'),
(44, 8, 3, 1, 1, '0.00', '2018-02-13 11:38:56'),
(45, 8, 3, 1, 1, '0.00', '2018-02-13 11:38:56'),
(46, 8, 3, 1, 1, '915.00', '2018-02-13 11:38:56'),
(47, 8, 3, 1, 1, '3.00', '2018-02-13 11:38:56'),
(48, 8, 3, 1, 1, '915.00', '2018-02-13 11:38:56');

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `version`) VALUES
(1, 'dash Player', '1');

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `client_id`, `player_id`) VALUES
(1, 1, 1);

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`) VALUES
(1, 'seconds'),
(2, 'KB'),
(3, 'No Unit');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
