CREATE TABLE `translated` (
  `id_translated` int(11) NOT NULL,
  `fid_translation` int(11) DEFAULT NULL,
  `translated` text DEFAULT NULL,
  `translated_language` varchar(2) DEFAULT NULL,
  `translated_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id_translated`),
  KEY `fid_translation` (`fid_translation`),
  KEY `translated_language` (`translated_language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
