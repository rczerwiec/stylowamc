-- CreateTable
CREATE TABLE `Mode0Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
