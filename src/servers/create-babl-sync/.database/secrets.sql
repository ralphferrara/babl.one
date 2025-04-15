CREATE TABLE `secrets` (
  `id_secret` int(11) NOT NULL AUTO_INCREMENT,
  `secret_domain` varchar(128) DEFAULT NULL,
  `secret_reference` varchar(48) DEFAULT NULL,
  `secret_value` text DEFAULT NULL,
  `secret_alias` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_secret`),
  KEY `secret_domain_idx` (`secret_domain`),
  KEY `secret_reference_idx` (`secret_reference`),
  KEY `secret_alias_idx` (`secret_alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
