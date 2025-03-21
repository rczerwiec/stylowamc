/*
  Warnings:

  - You are about to drop the column `bg_color` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `from_date` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `player_name` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `to_date` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `PlayerRanks` table. All the data in the column will be lost.
  - You are about to alter the column `rank` on the `PlayerRanks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - Added the required column `nickname` to the `PlayerRanks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid1` to the `PlayerRanks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid2` to the `PlayerRanks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `PlayerRanks_uuid_idx` ON `PlayerRanks`;

-- AlterTable
ALTER TABLE `PlayerRanks` DROP COLUMN `bg_color`,
    DROP COLUMN `color`,
    DROP COLUMN `from_date`,
    DROP COLUMN `is_active`,
    DROP COLUMN `player_name`,
    DROP COLUMN `to_date`,
    DROP COLUMN `uuid`,
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `from_when` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `nickname` VARCHAR(16) NOT NULL,
    ADD COLUMN `to_when` DATETIME(3) NULL,
    ADD COLUMN `uuid1` VARCHAR(36) NOT NULL,
    ADD COLUMN `uuid2` VARCHAR(36) NOT NULL,
    MODIFY `rank` VARCHAR(64) NOT NULL;

-- CreateIndex
CREATE INDEX `PlayerRanks_nickname_idx` ON `PlayerRanks`(`nickname`);

-- CreateIndex
CREATE INDEX `PlayerRanks_uuid1_idx` ON `PlayerRanks`(`uuid1`);

-- CreateIndex
CREATE INDEX `PlayerRanks_rank_idx` ON `PlayerRanks`(`rank`);
