-- CreateTable
CREATE TABLE `Survey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `typeUser` VARCHAR(191) NOT NULL,
    `accessChannels` VARCHAR(191) NOT NULL,
    `generalLayout` VARCHAR(191) NOT NULL,
    `informationFound` VARCHAR(191) NOT NULL,
    `problem` VARCHAR(191) NOT NULL,
    `suggest` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
