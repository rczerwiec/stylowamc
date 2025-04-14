/*
  Warnings:

  - You are about to drop the column `broken_blocks` on the `Mode2Stats` table. All the data in the column will be lost.
  - You are about to drop the column `island_level` on the `Mode2Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mode2Stats` DROP COLUMN `broken_blocks`,
    DROP COLUMN `island_level`,
    ADD COLUMN `blocks_broken` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `blocks_placed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_akrobatyka` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_alchemia` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_crossbows` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_drwal` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_gornictwo` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_level` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_lucznictwo` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_maces` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_miecze` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_naprawianie` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_niezrecznosc` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_odzyskiwanie` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_przepalanie` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_siekiery` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_tresowanie` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_tridents` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_wykopaliska` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mcmmo_zielarstwo` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_catches_common` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_catches_epic` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_catches_legendary` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_catches_rare` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_catches_uncommon` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_level` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_total_catches` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smfishing_xp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smmetin_total` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_bedrock` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_meteoryt` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_netherium` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_platyna` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_rubin` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `smpickaxe_total` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `PlayerRanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `uuid1` VARCHAR(191) NOT NULL,
    `uuid2` VARCHAR(191) NULL,
    `rank` VARCHAR(191) NOT NULL,
    `from_when` DATETIME(3) NOT NULL,
    `to_when` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,

    INDEX `PlayerRanks_uuid1_idx`(`uuid1`),
    INDEX `PlayerRanks_uuid2_idx`(`uuid2`),
    INDEX `PlayerRanks_nickname_idx`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
