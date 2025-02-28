-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firebaseId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `uuid` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_firebaseId_key`(`firebaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerMoneyRanking` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `money` DOUBLE NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerTimeRanking` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `time_played` BIGINT NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IslandLevelRanking` (
    `uuid` VARCHAR(191) NOT NULL,
    `position` INTEGER NOT NULL,
    `player_name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `service_name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Orders_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerStats` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `join_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_seen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `money` DOUBLE NOT NULL DEFAULT 0,
    `playtime` BIGINT NOT NULL DEFAULT 0,
    `smcoins` DOUBLE NOT NULL DEFAULT 0,
    `money_spent_pln` DOUBLE NOT NULL DEFAULT 0,
    `achievements_count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `PlayerStats_code_key`(`code`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

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
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

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
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

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
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

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
    `broken_blocks` INTEGER NOT NULL DEFAULT 0,
    `mob_kills` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerAchievements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `player_name` VARCHAR(16) NOT NULL,
    `achievement_id` VARCHAR(64) NOT NULL,
    `material` VARCHAR(64) NOT NULL,
    `unlock_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PlayerAchievements_uuid_achievement_id_key`(`uuid`, `achievement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `player_name` VARCHAR(191) NOT NULL,
    `achievement_id` VARCHAR(191) NOT NULL,
    `achievement_name` VARCHAR(128) NULL,
    `achievement_description` VARCHAR(256) NULL,
    `material` VARCHAR(191) NOT NULL,
    `unlock_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Achievement_uuid_idx`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
