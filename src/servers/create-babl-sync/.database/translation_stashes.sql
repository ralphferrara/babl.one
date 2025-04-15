CREATE TABLE `translation_stashes` (
  `id_ts` int(11) NOT NULL,
  `fid_translation` int(11) DEFAULT NULL,
  `fid_stash` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ts`),
  KEY `fid_translation` (`fid_translation`),
  KEY `fid_stash` (`fid_stash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
