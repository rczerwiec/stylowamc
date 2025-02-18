-- CreateTable
CREATE TABLE `Mode1Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mode2Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mode3Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mode4Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mode5Stats` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(16) NOT NULL,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `deaths` INTEGER NOT NULL DEFAULT 0,
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `island_level` INTEGER NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
