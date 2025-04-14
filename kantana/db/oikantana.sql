-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2025 at 12:20 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oikantana`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblsonglist`
--

CREATE TABLE `tblsonglist` (
  `id` int NOT NULL,
  `videoId` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblsonglist`
--

INSERT INTO `tblsonglist` (`id`, `videoId`, `title`, `duration`, `channel`) VALUES
(1, 'frxXbxJQ-xA', 'Kamikazee | Narda (HQ Karaoke)', '4:59', 'Otep333 Karaoke Trackz'),
(2, 'iqUdOY75tEk', 'USOK - Asin (HD Karaoke)', '3:22', 'Atomic Karaoke... '),
(3, '2vMgtp7T5lg', 'SIGAW NG PUSO - Father and Sons (HD Karaoke)', '4:31', 'Atomic Karaoke... '),
(4, 'K2COGfd1ZVs', 'Heaven Knows - Orange & Lemons (Karaoke Version)', '4:19', 'KaraokeyTV'),
(5, 'ksVt5vhWhTs', 'NIGHT CHANGES - One Direction (KARAOKE PIANO VERSION)', '4:37', 'CoversPH'),
(6, 'Xub5ve4xq1E', 'Gabay - Siakol (KARAOKE)', '5:08', 'PRO music COVER'),
(7, 'sxMsnOTfM_w', 'JOPAY - Mayonnaise (HD Karaoke)', '4:29', 'Atomic Karaoke... '),
(8, 'Xkkn8xzfyck', 'zelle - sabihin karaoke', '4:53', 'KaraokeyTV'),
(9, '2rjZsgEVYNM', 'MAPA - SB19 (KARAOKE VERSION)', '4:38', 'CoversPH'),
(10, 'V9WSstopfvE', 'UHAW - Dilaw (Karaoke)', '4:12', 'Migz Nath'),
(11, 'Kq33l1K7Z7w', 'Magbalik - CALLALILY (KARAOKE)', '5:27', 'PRO music COVER'),
(12, 'N0l7F-PtTwU', 'Pangako - CUESHE (KARAOKE)', '3:28', 'PRO music COVER'),
(13, 'BiKU79XjelQ', '24 hour ago - CUESHE (KARAOKE)', '4:02', 'PRO music COVER'),
(14, 'R_nsIAFyvWI', 'Juan Karlos - Demonyo (Karaoke) 🎵', '5:41', 'Mega Karaoke Songs'),
(15, 'aLF6DlxMr4g', 'ULAN - Cueshe (HD Karaoke)', '4:56', 'Atomic Karaoke... '),
(16, '8di0DYO8kj0', 'KISAPMATA - Rivermaya (Karaoke Version)', '4:49', 'Global KaraokeyTV'),
(17, 'hshZ2dRBpUQ', 'Alipin Ako - Liezel Garcia (KARAOKE)', '4:41', 'PRO music COVER'),
(18, 'ymalJ5AMH4U', 'Stay - CUESHE (KARAOKE)', '4:01', 'PRO music COVER'),
(19, 'TvGifmI3nhk', 'Eroplanong Papel - December Avenue (Karaoke)', '5:12', 'Mi Balmz Karaoke Tracks'),
(20, 'tdKXPzqr-yU', 'SINE-SINE - Missing Filemon | HD Karaoke', '4:04', 'Karaoke Vibes PH'),
(21, '5IgaD8NT6oI', 'The Day You Said Goodnight -  Hale (Karaoke)', '5:11', 'KaraokeyTV'),
(22, 'PGsmMBvi4YM', 'BRING ME DOWN - CUESHE (karaoke version)', '4:12', 'My All Time Karaoke'),
(23, 'rPQQq0CEZ0M', 'ANTUKIN - Rico Blanco (Karaoke)', '4:46', 'Mi Balmz Karaoke Tracks'),
(24, 'xV7erzHcvXs', 'May tama rin ako - Jay-R Siaboc (KARAOKE)', '3:23', 'PRO music COVER'),
(25, 'hrN0jz16aBw', 'AKIN KA NA LANG - Morissette Amon (HD Karaoke)', '4:24', 'Atomic Karaoke... '),
(26, 'ehsKggDCKbY', 'Callalily | Magbalik (Karaoke + Instrumental)', '5:27', 'Otep333 Karaoke Trackz'),
(27, 'v7hRpilP2sg', 'Nobela - Join The Club (KARAOKE)', '4:56', 'PRO music COVER'),
(28, 'oPJs_fHWM6Q', '2005 OPM HITS MEDLEY (KARAOKE VIDEO)', '5:16', 'SING A LONG '),
(29, 'WBOGNGP4row', 'PRINSESA - The Teeth (HD Karaoke)', '4:59', 'Atomic Karaoke... '),
(30, '6iSSqOyI5UU', 'TATAY (Reggae Remix) | KARAOKE / INSTRUMENTAL | Otab Inalab ✘ DJ Claiborne Remix', '5:05', 'Claiborne Remix'),
(31, 's7mMMkiSgTo', 'Eraserheads | Ang Huling El Bimbo (Karaoke + Instrumental)', '7:30', 'Otep333 Karaoke Trackz'),
(32, 'G6URHRM3naw', 'Bisan Pa - Phylum/Wet Slipperz (Karaoke)', '4:39', 'Mi Balmz Karaoke Tracks'),
(33, '6wWxI3xN_BQ', 'Pasabta Ko (KARAOKE) by Leela Laburada (Kuya Bryan - OBM)', '4:26', 'Kuya Bryan'),
(34, 'N2CcmAfRY7k', 'Sabot Sabot - Phylum (KARAOKE)', '3:41', 'MusikaRaoke'),
(35, 'DI2svVReemg', 'HAHAHAHasula - Kurt Fick (KARAOKE VERSION)', '4:57', 'CoversPH'),
(36, 'LNJLFEyBcqk', 'Tonto Na Gugma  Karaoke Version  BY darling kho (feat. Rocky Santino)', '4:40', 'Videoke Lovers'),
(37, 'xocmAXBqlxY', 'GI FINGERS visayan song bisrock karaoke', '5:48', 'karaoke TM'),
(38, '8g9-KwnDoek', 'ANG BALAY NI MAYANG martina san diego & kyle wong karaoke', '3:23', 'karaoke TM'),
(39, 'BU2ufsWCtcg', 'SA AKING PAG-IISA | Cinderella • KARAOKE  • FEMALE KEY', '3:00', 'TLS Karaoke'),
(40, '92DKMSoJOzI', 'DI AKO F-BOY - JRoa & Emcee Rhenn ft. Agsunta (KARAOKE VERSION)', '4:49', 'CoversPH'),
(41, 'XOsNvHj0H4E', 'KUNG SIYA MAN - TJ Monterde (KARAOKE VERSION)', '5:03', 'CoversPH'),
(42, 'Gf-hUG-Fne4', 'Porque - (Karaoke Version)', '5:10', 'KaraokeyTV'),
(43, 'YBrYgui_4No', 'CHARING (visayan song) bisrock karaoke', '4:59', 'karaoke TM'),
(44, 'pSikuRKU2dU', 'GIKUMOT KUMOT (visayan song) bisrock karaoke', '3:33', 'karaoke TM'),
(45, 'MSMsjZHob_A', 'Hallelujah – Bamboo [Karaoke]', '4:52', 'Caharo'),
(46, 'fMT-OznyYRQ', 'Air Supply Medley (Karaoke Version)', '7:15', 'YenJohn HD Karaoke'),
(47, 'foJLBGw9UpI', 'Puhon - TJ Monterde (Karaoke/Instrumental)', '4:12', 'Mi Balmz Karaoke Tracks'),
(48, '9nwGKSAfU1I', 'Pasensya Ka Na - SILENT SANCTUARY (KARAOKE)', '4:08', 'PRO music COVER'),
(49, 'Rz9x2mnN8DM', 'Paubaya - (Karaoke) Moira Dela Torre', '5:10', 'KaraokeyTV'),
(50, 'gRYMeuN9hlA', 'LET ME BE THE ONE (Karaoke Version) Jimmy Bondoc', '5:15', 'Global KaraokeyTV'),
(51, 'XlfTirShNsw', 'Magbalik - Callalily (Karaoke)', '5:46', 'KaraokeyTV'),
(52, 'P4ApYxP0kos', 'YOU\'LL BE SAFE HERE - Rivermaya (HD Karaoke)', '5:17', 'Atomic Karaoke... '),
(53, '2J0hjAh06T0', 'Kitchie Nadal Medley - (Karaoke)', '7:08', 'KaraokeyTV'),
(54, 'vC9ygdt-oqI', 'TULAD MO - TJ Monterde (KARAOKE VERSION)', '3:44', 'CoversPH'),
(55, 'DcEI2aEokks', 'DATING TAYO - TJ Monterde (KARAOKE VERSION)', '4:24', 'CoversPH'),
(56, '-TWflZWV6C8', 'THE SCIENTIST - Coldplay (HQ KARAOKE VERSION with lyrics)', '5:18', 'Agaw Music Karaoke'),
(57, 'H1TAEeO5YlE', 'UPSIDE DOWN - 6cyclemind (HD Karaoke)', '5:45', 'Atomic Karaoke... '),
(58, 'OHIFuGAaod4', 'RIVERMAYA MEDLEY (KARAOKE HQ VERSION)', '10:32', 'APMusic'),
(59, '8mK_remhVlM', 'CREEP - Radiohead (HD Karaoke)', '4:09', 'Atomic Karaoke... '),
(60, 'sxoUL6T5myk', 'SOMEWHERE ONLY WE KNOW -  Keane (HQ KARAOKE VERSION with lyrics)', '4:00', 'Agaw Music Karaoke'),
(61, 'Xcv6maGcD5o', 'SANA - I Belong to the Zoo (KARAOKE VERSION)', '4:44', 'MusicLounge'),
(62, 'b5iFAL71-gs', 'Won\'t Go Home Without You (Karaoke Version) - Maroon 5', '3:58', 'Tracks Planet Karaoke'),
(63, 'UzNB6bPKbLg', 'When She Cries - Restless Heart (Karaoke Version)', '3:56', 'KaraokeyTV'),
(64, 'CA4S4oduut4', 'LAPIT - Yeng Constantino | KARAOKE', '4:45', 'Karaoke Vibes PH'),
(65, 'xpff0rr6dgc', 'Always Remember Us This Way - (Karaoke)  Lady Gaga', '3:43', 'KaraokeyTV'),
(66, 'BU37j6bMXCg', 'Di Na Babalik - This Band (Karaoke)', '6:27', 'Mi Balmz Karaoke Tracks'),
(67, 'k2nWQ808tCI', 'Maybe This Time - Sarah Geronimo ( Karaoke )', '4:22', 'KaraokeyTV'),
(68, 'jxJCLKkH0Rg', 'HINDI NA SANA - Zelle | Karaoke Version | koolSound', '6:08', 'XLSD');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblsonglist`
--
ALTER TABLE `tblsonglist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblsonglist`
--
ALTER TABLE `tblsonglist`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
