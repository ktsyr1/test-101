-- AlterTable
ALTER TABLE `user` MODIFY `fullname` VARCHAR(191) NULL DEFAULT '',
    MODIFY `password` VARCHAR(191) NULL DEFAULT '',
    MODIFY `bio` VARCHAR(191) NULL DEFAULT '',
    MODIFY `image` VARCHAR(191) NULL DEFAULT '',
    MODIFY `verify_User` BOOLEAN NULL DEFAULT false;
