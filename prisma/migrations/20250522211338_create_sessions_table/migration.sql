-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "device" TEXT,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
