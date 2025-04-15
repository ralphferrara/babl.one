CREATE TABLE `translations` (
  `id_translation` int(11) NOT NULL,
  `translation_section` varchar(32) DEFAULT NULL,
  `translation_area` varchar(32) DEFAULT NULL,
  `translation_key` varchar(128) DEFAULT NULL,
  `translation_default` text DEFAULT NULL,
  `translation_timestamp` datetime DEFAULT NULL,
  `translation_reset` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
