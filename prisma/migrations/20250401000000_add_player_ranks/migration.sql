-- CreateTable
CREATE TABLE `PlayerRanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `player_name` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `color` VARCHAR(50) NULL,
    `bg_color` VARCHAR(50) NULL,

    INDEX `PlayerRanks_uuid_idx`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 