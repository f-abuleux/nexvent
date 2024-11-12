/*
  Warnings:

  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `discountDiscount_name` VARCHAR(191) NULL,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_discountDiscount_name_fkey` FOREIGN KEY (`discountDiscount_name`) REFERENCES `Discount`(`discount_code`) ON DELETE SET NULL ON UPDATE CASCADE;
