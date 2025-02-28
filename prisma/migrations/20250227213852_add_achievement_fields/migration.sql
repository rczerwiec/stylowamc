-- AlterTable
ALTER TABLE `PlayerAchievements` ADD COLUMN `achievement_description` VARCHAR(191) NULL,
    ADD COLUMN `achievement_name` VARCHAR(191) NULL,
    MODIFY `uuid` VARCHAR(191) NOT NULL,
    MODIFY `player_name` VARCHAR(191) NOT NULL,
    MODIFY `achievement_id` VARCHAR(191) NOT NULL,
    MODIFY `material` VARCHAR(191) NULL;
