-- CreateTable
CREATE TABLE `PlayerCode` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlayerCode_code_key`(`code`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
