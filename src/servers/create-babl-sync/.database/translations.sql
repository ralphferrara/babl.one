CREATE TABLE `translations` (
  `id_translation` int(11) NOT NULL AUTO_INCREMENT,
  `translation_section` varchar(32) DEFAULT NULL,
  `translation_area` varchar(32) DEFAULT NULL,
  `translation_key` varchar(128) DEFAULT NULL,
  `translation_default` text DEFAULT NULL,
  `translation_timestamp` datetime DEFAULT NULL,
  `translation_accessed` datetime DEFAULT NULL,
  `translation_reset` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_translation`),
  KEY `translation_section` (`translation_section`),
  KEY `translation_area` (`translation_area`),
  KEY `translation_key` (`translation_key`),
  KEY `translation_accessed` (`translation_accessed`),
  KEY `translation_timestamp` (`translation_timestamp`),
  KEY `translation_reset` (`translation_reset`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
