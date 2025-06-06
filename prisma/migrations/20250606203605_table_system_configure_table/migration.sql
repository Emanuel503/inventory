-- CreateTable
CREATE TABLE "SystemConfigure" (
    "id" SERIAL NOT NULL,
    "twofactoreRequired" BOOLEAN NOT NULL DEFAULT false,
    "idUserUpdate" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemConfigure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SystemConfigure" ADD CONSTRAINT "SystemConfigure_idUserUpdate_fkey" FOREIGN KEY ("idUserUpdate") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
