/*
  Warnings:

  - You are about to drop the column `size` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "size";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sizes";

-- DropEnum
DROP TYPE "Size";
