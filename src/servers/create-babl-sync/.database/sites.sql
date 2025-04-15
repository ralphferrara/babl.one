CREATE TABLE `sites` (
  `id_site` int(11) NOT NULL AUTO_INCREMENT,
  `site_domain` varchar(128) DEFAULT NULL,
  `site_active` tinyint(4) DEFAULT 1,
  `site_description` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id_site`),
  UNIQUE KEY `site_domain_UNIQUE` (`site_domain`),
  KEY `site_active` (`site_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
