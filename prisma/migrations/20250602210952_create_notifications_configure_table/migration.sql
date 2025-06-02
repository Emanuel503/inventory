-- CreateTable
CREATE TABLE "NotificationsConfigure" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "emailSessions" BOOLEAN NOT NULL DEFAULT true,
    "passwordChange" BOOLEAN NOT NULL DEFAULT true,
    "updatesSystem" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationsConfigure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationsConfigure_idUser_key" ON "NotificationsConfigure"("idUser");

-- AddForeignKey
ALTER TABLE "NotificationsConfigure" ADD CONSTRAINT "NotificationsConfigure_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
