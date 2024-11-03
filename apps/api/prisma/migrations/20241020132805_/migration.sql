/*
  Warnings:

  - You are about to drop the `_carttoorder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_carttoorder` DROP FOREIGN KEY `_CartToOrder_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carttoorder` DROP FOREIGN KEY `_CartToOrder_B_fkey`;

-- AlterTable
ALTER TABLE `cart` ADD COLUMN `order_id` INTEGER NULL;

-- DropTable
DROP TABLE `_carttoorder`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE SET NULL ON UPDATE CASCADE;
