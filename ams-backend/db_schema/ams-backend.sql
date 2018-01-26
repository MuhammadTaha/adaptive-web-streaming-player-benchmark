-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 26, 2018 at 10:05 AM
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
-- Table structure for table `bitrate`
--

CREATE TABLE `bitrate` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `value` decimal(10,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bitrate`
--

INSERT INTO `bitrate` (`id`, `client_id`, `session_id`, `unit_id`, `value`) VALUES
(1, 1, 2, 3, '4.00');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `library_metric`
--

CREATE TABLE `library_metric` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `library_metric`
--

INSERT INTO `library_metric` (`id`, `name`) VALUES
(1, 'bitrate'),
(2, 'CPULoad');

-- --------------------------------------------------------

--
-- Table structure for table `playback_delay`
--

CREATE TABLE `playback_delay` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `value` decimal(10,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playback_delay`
--

INSERT INTO `playback_delay` (`id`, `client_id`, `session_id`, `unit_id`, `value`) VALUES
(28, 1, 2, 33, '29657.00'),
(27, 1, 1, 33, '11519.00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(8) NOT NULL,
  `duration` time NOT NULL,
  `start_time` time NOT NULL COMMENT 'Time to start sample playback',
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`id`, `name`) VALUES
(1, 'kbit/s');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bitrate`
--
ALTER TABLE `bitrate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `library_metric`
--
ALTER TABLE `library_metric`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playback_delay`
--
ALTER TABLE `playback_delay`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `SESSIONID` (`session_id`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bitrate`
--
ALTER TABLE `bitrate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `library_metric`
--
ALTER TABLE `library_metric`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `playback_delay`
--
ALTER TABLE `playback_delay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
