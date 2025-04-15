CREATE TABLE `stashes` (
  `id_stash` int(11) NOT NULL,
  `stash_path` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id_stash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
