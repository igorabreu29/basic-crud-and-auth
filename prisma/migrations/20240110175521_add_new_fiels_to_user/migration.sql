/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `adress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "birth" TEXT NOT NULL,
ADD COLUMN     "father" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "mother" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Role";
