CREATE TABLE `errors` (
  `id_error` int(11) NOT NULL,
  `error_code` varchar(32) DEFAULT NULL,
  `error_message` varchar(256) DEFAULT NULL,
  `error_translated` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id_error`),
  UNIQUE KEY `error_code_UNIQUE` (`error_code`),
  KEY `error_translated` (`error_translated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
