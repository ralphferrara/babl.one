CREATE TABLE `aliases` (
  `id_alias` int(11) NOT NULL,
  `fid_site` int(11) DEFAULT NULL,
  `alias_domain` varchar(128) DEFAULT NULL,
  `alias_active` tinyint(1) DEFAULT 1,
  `alias_description` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id_alias`),
  UNIQUE KEY `alias_domain_UNIQUE` (`alias_domain`),
  KEY `fid_site` (`fid_site`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
