-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 08:55 AM
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
-- Database: `user_accounts`
--

-- --------------------------------------------------------

--
-- Table structure for table `poll`
--

CREATE TABLE `poll` (
  `poll_id` int(11) NOT NULL,
  `question` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`poll_id`, `question`) VALUES
(1, 'Who is most likely to become the President of the Philippines?'),
(2, 'If sunshine were a person, they would be that person'),
(3, 'Uncanny Faculty Lookalike'),
(4, 'Who is the most iconic duo in the batch'),
(5, 'Pinakatambay sa Bangs award goes to...');

-- --------------------------------------------------------

--
-- Table structure for table `poll_options`
--

CREATE TABLE `poll_options` (
  `id` int(11) NOT NULL,
  `poll_id` int(11) NOT NULL,
  `option_text` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_options`
--

INSERT INTO `poll_options` (`id`, `poll_id`, `option_text`) VALUES
(1, 1, 'Hansen Maeve Quindao'),
(2, 1, 'Keith Ashly Domingo'),
(3, 1, 'Kent Francis Genilo'),
(4, 1, 'Sam Lansoy'),
(5, 2, 'Nicole Ashly Dy'),
(6, 2, 'Angel May Janiola'),
(7, 2, 'Kenneth Mondejar'),
(8, 2, 'Sunshine Dela Cruz'),
(9, 3, 'RJ as sir Nikko'),
(10, 3, 'Keith as Sir Poy'),
(11, 3, 'Nina as Ma\'am Ara'),
(12, 3, 'Kent as Sir Victor'),
(13, 4, 'Salmon and Dan'),
(14, 4, 'Niko and Sam'),
(15, 4, 'Kent and Jave'),
(16, 4, 'Ace and Zues');

-- --------------------------------------------------------

--
-- Table structure for table `poll_votes`
--

CREATE TABLE `poll_votes` (
  `user_id` int(11) NOT NULL,
  `poll_id` int(11) NOT NULL,
  `vote_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `voted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_votes`
--

INSERT INTO `poll_votes` (`user_id`, `poll_id`, `vote_id`, `option_id`, `voted_at`) VALUES
(4, 2, 0, 5, NULL),
(6, 2, 0, 6, NULL),
(7, 2, 0, 8, NULL),
(8, 2, 0, 8, NULL),
(9, 2, 0, 6, NULL),
(11, 2, 0, 5, NULL),
(12, 2, 0, 7, NULL),
(13, 2, 0, 5, NULL),
(14, 2, 0, 5, NULL),
(15, 1, 0, 1, NULL),
(15, 2, 0, 8, NULL),
(16, 1, 0, 4, NULL),
(16, 2, 0, 7, NULL),
(17, 1, 0, 3, NULL),
(17, 2, 0, 7, NULL),
(18, 1, 0, 3, NULL),
(18, 2, 0, 6, NULL),
(19, 1, 0, 1, NULL),
(19, 2, 0, 8, NULL),
(20, 1, 0, 1, NULL),
(20, 2, 0, 6, NULL),
(21, 1, 0, 1, NULL),
(21, 2, 0, 6, NULL),
(22, 1, 0, 2, NULL),
(23, 1, 0, 4, NULL),
(24, 1, 0, 4, NULL),
(25, 1, 0, 3, NULL),
(26, 1, 0, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posting`
--

CREATE TABLE `posting` (
  `id` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `acctUserID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posting`
--

INSERT INTO `posting` (`id`, `postID`, `acctUserID`) VALUES
(2, 1003, NULL),
(2, 1004, NULL),
(2, 1005, NULL),
(2, 1006, NULL),
(2, 1007, NULL),
(2, 1008, NULL),
(7, 1010, NULL),
(7, 1011, NULL),
(19, 1012, NULL),
(19, 1013, NULL),
(19, 1014, NULL),
(19, 1015, NULL),
(19, 1016, NULL),
(19, 1017, NULL),
(19, 1018, NULL),
(19, 1019, NULL),
(19, 1020, NULL),
(19, 1021, NULL),
(19, 1022, NULL),
(19, 1023, NULL),
(19, 1024, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `postID` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `reply_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`postID`, `content`, `reply_to`) VALUES
(1000, 'what haffen vella', NULL),
(1001, 'what haffen vella', NULL),
(1002, 'vampayr ryt?', NULL),
(1003, 'vampary will fayt to me!', NULL),
(1004, 'edward', NULL),
(1005, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL),
(1006, 'what', NULL),
(1007, 'you can wear all types of makeup on your pretty face, but your dirty record and attitude reek from the depths of your rotten personality. you crucify people for their sins when you can’t even face the consequences of your own. di lang puro ganda-gandahan. try mo rin magkacharacter development… kimmy lang vebs,,,', 1001),
(1008, 'If you wanna run away with me, I know a galaxy\nAnd I can take you for a ride\nI had a premonition that we fell into a rhythm\nWhere the music don\'t stop for life\nGlitter in the sky, glitter in my eyes\nShining just the way I like\nIf you\'re feeling like you need a little bit of company\nYou met me at the perfect time\nYou want me, I want you, baby\nMy sugarboo, I\'m levitating\nThe Milky Way, we\'re renegading\nYeah, yeah, yeah, yeah, yeah\nI got you, moonlight, you\'re my starlight\nI need you all night, come on, dance with me\nI\'m levitating\nYou, moonlight, you\'re my starlight (you\'re the moonlight)\nI need you all night, come on, dance with me\nI\'m levitating\nI believe that you\'re for me, I feel it in our energy\nI see us written in the stars\nWe can go wherever, so let\'s do it now or never, baby\nNothing\'s ever, ever too far\nGlitter in the sky, glitter in our eyes\nShining just the way we are\nI feel like we\'re forever, every time we get together\nBut whatever, let\'s get lost on Mars\nYou want me, I want you, baby\nMy sugarboo, I\'m levitating\nThe Milky Way, we\'re renegading\nYeah, yeah, yeah, yeah, yeah\nI got you, moonlight, you\'re my starlight\nI need you all night, come on, dance with me\nI\'m levitating\nYou, moonlight, you\'re my starlight (you\'re the moonlight)\nI need you all night, come on, dance with me\nI\'m levitating (whoo)\nYou can fly away with me tonight\nYou can fly away with me tonight\nBaby, let me take you for a ride\nYeah, yeah, yeah, yeah, yeah\nI\'m levitating (whoo)\nYou can fly away with me tonight\nYou can fly away with me tonight\nBaby, let me take you for a ride\nYeah, yeah, yeah, yeah, yeah (whoo)\nMy love is like a rocket, watch it blast off\nAnd I\'m feeling so electric, dance my arse off\nAnd even if I wanted to, I can\'t stop\nYeah, yeah, yeah, yeah, yeah (whoo)\nMy love is like a rocket, watch it blast off\nAnd I\'m feeling so electric, dance my arse off\nAnd even if I wanted to, I can\'t stop\nYeah, yeah, yeah, yeah, yeah\nYou want me, I want you, baby\nMy sugarboo, I\'m levitating\nThe Milky Way, we\'re renegading\nI got you (yeah), moonlight, you\'re my starlight\nI need you all night (all night), come on, dance with me\nI\'m levitating (whoo)\nYou can fly away with me tonight (tonight)\nYou can fly away with me tonight\nBaby, let me take you for a ride\nYeah, yeah, yeah, yeah, yeah (let me take you for a ride)\nI\'m levitating (whoo)\nYou can fly away with me tonight (tonight)\nYou can fly away with me tonight\nBaby, let me take you for a ride\nYeah, yeah, yeah, yeah, yeah (let me take you for a ride)\nI got you, moonlight, you\'re my starlight (you are my starlight)\nI need you all night, come on, dance with me (come on, dance with me, baby)\nI\'m levitating\nYou, moonlight, you\'re my starlight (you\'re the moonlight)\nI need you all night, come on, dance with me\nI\'m levitating', NULL),
(1009, 'ay wow lyrics', 1008),
(1010, 'dsfsdfd', NULL),
(1011, 'aasdsds', NULL),
(1012, 'hhgsadhas', NULL),
(1013, 'adas', NULL),
(1014, 'ggg', NULL),
(1015, 'naurrrrrrrrrrr', 1014),
(1016, 'edwe', NULL),
(1017, 'ewfweff', NULL),
(1018, 'fefew', 1017),
(1019, 'sombr music on top', NULL),
(1020, 'ew pasikat', 1019),
(1021, 'ror', NULL),
(1022, 'rorrr', NULL),
(1023, 'RORRRRRORR', 1022),
(1024, 'rorororororor', 1023);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(2, 'smliberty@yahoo.com', 'sammyLibs25', '$2y$10$InwBYfz9Vk9CWhNXxhmB4eTWAzbQdo0LkkjgSesIe3QxkeUE7taZ.'),
(3, 'nina@gmail.com', 'nina_test', '$2y$10$Gzb1h/9Xb.LZZ0KpuDZ.HO24rvDah07SRbQ.oIniVCbePjZi1vTp.'),
(4, 'ninacl@gmail.com', 'nina_dakotite', '$2y$10$XLOLFSBwGX13.EvV5FxoDOSANg.fRTX/pI/D0qt6ms6vVQgqDWvuO'),
(5, 'nn@gmail.com', 'nn', '$2y$10$VNMx2.D9VqwdBJMKtoifCuA99X4.JkSIB35R7gARO/rpIcvnjqkLm'),
(6, 'nnin@gmail.com', 'nnin', '$2y$10$D1Mqd9cKwV4UoL.qeqGK6ejO2Rfxn15wKZybHQyqma9GtzjaVx2Um'),
(7, 'nii@gmail.com', 'nii', '$2y$10$.fgcoIly5Wv6.UEQtOWY4uFFs6YxeMIBInet8AiZpWLDvQYWXrGkm'),
(8, 'test@gmail.com', 'test', '$2y$10$iiopNSxDDeI39UU4FFcpeOlUqimrwXeh7wPMT6qih25LdxyOa5hIy'),
(9, 'babygronk@gmail.com', 'babygronk', '$2y$10$w0cgYKCkzsHTjULki.W.9e5jwGRaPdG4cMhXHhv6ofU3pC2HiA29S'),
(10, 'hongthai@gmail.com', 'hongthailov3r', '$2y$10$wvRkwKjC.N55aPhxBUxbjOaSCELWqC7RxxmPzZqUBqJapjJ3udfM2'),
(11, 'hongthailover@gmail.com', 'hongthailover', '$2y$10$NhWz9xcoj3azFCbYY/yfN.CB16o9mwW4G9pN1vfZ252QWiP.i9qX2'),
(12, 'banjolet@gmail.com', 'banjolet', '$2y$10$uFMNcA5CrzS6LwSutUVWy.nHIYI90hAz8LB74IoBX7WYw/Rt98Ohm'),
(13, 'bole@gmail.com', 'bole', '$2y$10$M/T4Du7.TJ6jTxEWq.w8S.NFP0Gp1cBBuLELkNOfK7ZSIqO6/Nb4e'),
(14, 'juseyo@gmail.com', 'juseyo', '$2y$10$Mocj604LQamvM1Y3m85JZugJ2cen7DNfF9yFn6HmCYFi8OIqb/PyO'),
(15, 'taurus@gmail.com', 'taurus', '$2y$10$y40OI5xIqgjqEz5MqDWSdO6Iq1fiiQjrxQPqjtdXQ4yyz/lqbBIK6'),
(16, 'leo@gmail.com', 'leo', '$2y$10$rg8mnRI3RprkQFnHIvm1kOTaT7FxXusTJyc7Ry.1RKxc0TcST3crm'),
(17, 'aries@gmail.com', 'aries', '$2y$10$rnMJyD1EA6yWVjKEtm1UA.AAuQlCtDZm75f9bt3zFSFmG.I9LZ5Q2'),
(18, 'gemini@gmail.com', 'gemini', '$2y$10$lUkaG1.NjQmRPucQVWXpO.j0ySXrn5WXQ2aU1jssQ/nb1Z9rLgjry'),
(19, 'libra@gmail.com', 'libra', '$2y$10$2YcCqoXx.WabP2lvJsqGOuh7qGDV4iUSGEgTyXyzLiEijiOmeduq2'),
(20, 'cancer@gmail.com', 'cancer', '$2y$10$lzu/hAwLVgsTqwAfc49VpOrogKTXpi7L.SHeVnpWZCMMcTiwWew56'),
(21, 'aquarius@gmail.com', 'aquarius', '$2y$10$RR9NoX58oFqmOmg7SOhN/ub9mddll5LX4OmwE7C2sk.DQJdwQg9Pm'),
(22, 'capricorn@gmail.com', 'capricorn', '$2y$10$GXg.0Hjx/I0DNgi8juzz2uD9W7Fr7GJpx57Qcu5aPXUamS6jtocU.'),
(23, 'saturn@gmail.com', 'saturn', '$2y$10$Ejvs6MpN6T5iTlVDbto67.RUGhPlYJSfPaVg6v8uIdnW551/joSD2'),
(24, 'virgo@gmail.com', 'virgo', '$2y$10$y50y2MUQMtw5kdxUlEdkOu/dSkc5Dhpfu1fTIrEwEi26FopY78XVC'),
(25, 'pisces@gmail.com', 'pisces', '$2y$10$3WzVoevoSQGQDZKH.JDCJuCkK3XAiYtp4yfPTTw0rMM47fsrpuRXW'),
(26, 'sheldon@gmail.com', 'sheldon', '$2y$10$vpRyLYMBwMY3nV0lcgnTDOxv8/j7DOz/uq/o8S6pbc8EQtxVxCar2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `poll`
--
ALTER TABLE `poll`
  ADD PRIMARY KEY (`poll_id`);

--
-- Indexes for table `poll_options`
--
ALTER TABLE `poll_options`
  ADD PRIMARY KEY (`id`,`poll_id`),
  ADD KEY `poll_id` (`poll_id`);

--
-- Indexes for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD PRIMARY KEY (`user_id`,`poll_id`,`vote_id`,`option_id`),
  ADD KEY `poll_id` (`poll_id`),
  ADD KEY `option_id` (`option_id`);

--
-- Indexes for table `posting`
--
ALTER TABLE `posting`
  ADD KEY `id` (`id`),
  ADD KEY `postID` (`postID`),
  ADD KEY `acctUserID` (`acctUserID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1025;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `poll_options`
--
ALTER TABLE `poll_options`
  ADD CONSTRAINT `poll_options_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `poll` (`poll_id`);

--
-- Constraints for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD CONSTRAINT `poll_votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `poll_votes_ibfk_2` FOREIGN KEY (`poll_id`) REFERENCES `poll` (`poll_id`),
  ADD CONSTRAINT `poll_votes_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `poll_options` (`id`);

--
-- Constraints for table `posting`
--
ALTER TABLE `posting`
  ADD CONSTRAINT `posting_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posting_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `posts` (`postID`) ON DELETE CASCADE,
  ADD CONSTRAINT `posting_ibfk_3` FOREIGN KEY (`acctUserID`) REFERENCES `users` (`id`) ON DELETE SET NULL;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `flag_expired_polls` ON SCHEDULE EVERY 10 MINUTE STARTS '2025-05-23 00:29:10' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE polls SET is_expired = 1 WHERE expires_at <= NOW() AND is_expired = 0$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
