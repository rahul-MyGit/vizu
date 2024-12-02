/*
  Warnings:

  - Added the required column `content` to the `Options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCorrect` to the `Options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "explanation" TEXT;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "transcript" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Answer_quizattemptid_idx" ON "Answer"("quizattemptid");

-- CreateIndex
CREATE INDEX "Answer_questionId_idx" ON "Answer"("questionId");

-- CreateIndex
CREATE INDEX "Answer_optionId_idx" ON "Answer"("optionId");

-- CreateIndex
CREATE INDEX "Options_questionId_idx" ON "Options"("questionId");

-- CreateIndex
CREATE INDEX "Question_quizId_idx" ON "Question"("quizId");

-- CreateIndex
CREATE INDEX "Quiz_userId_idx" ON "Quiz"("userId");

-- CreateIndex
CREATE INDEX "Quizattempt_quizId_idx" ON "Quizattempt"("quizId");

-- CreateIndex
CREATE INDEX "Quizattempt_userId_idx" ON "Quizattempt"("userId");
