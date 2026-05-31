/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Task` table. All the data in the column will be lost.
  - Made the column `image` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "correctAnswer",
DROP COLUMN "options",
DROP COLUMN "question",
ALTER COLUMN "image" SET NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
