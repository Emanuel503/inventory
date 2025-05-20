-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "idMenu" INTEGER NOT NULL,
    "idRol" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Access_idMenu_idRol_key" ON "Access"("idMenu", "idRol");

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_idMenu_fkey" FOREIGN KEY ("idMenu") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
