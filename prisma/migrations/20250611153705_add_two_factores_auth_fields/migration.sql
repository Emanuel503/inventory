-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "twoFactorAuth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorCode" TEXT,
ADD COLUMN     "twoFactorConfirm" TIMESTAMP(3);
