-- CreateTable
CREATE TABLE "Menus" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "idFather" INTEGER,
    "menu" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_idFather_fkey" FOREIGN KEY ("idFather") REFERENCES "Menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
