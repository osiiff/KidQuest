/*
  Warnings:

  - You are about to drop the column `type` on the `Task` table. All the data in the column will be lost.
  - Added the required column `correctAnswer` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "type",
ADD COLUMN     "correctAnswer" TEXT NOT NULL,
ADD COLUMN     "options" TEXT[],
ADD COLUMN     "question" TEXT NOT NULL;
